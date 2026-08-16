"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  moveCard,
  swapCards,
  type DrillCard,
  type OrderOfDrawResult,
} from "@/lib/drills/orderOfDraw";
import { cx } from "@/components/shared/ui";
import { CARD_TONES, CardFace, CardNote, SlotNumber, type CardTone } from "./SequenceCard";

/**
 * The reorderable board.
 *
 * Dragging is done with pointer events rather than the HTML5 drag-and-drop
 * API. That API gives you a translucent screenshot of the row floating under
 * the cursor, no control over what the rest of the list does, and nothing at
 * all on touch. Here the card itself lifts and follows the finger, the cards
 * it displaces slide out of its way, and the slot numbers count up and down
 * live, so the sequence you are about to commit to is always the one on
 * screen.
 *
 * Three interchangeable ways to reorder, all driving the same state:
 *
 * 1. Drag — press the grip on any pointer device, or drag the card body with
 *    a mouse. Touch dragging is deliberately grip-only so the page can still
 *    be scrolled with a finger anywhere else on the card.
 * 2. Tap a card to pick it up, tap another to swap.
 * 3. Keyboard — focus a grip, press Space to lift, arrow keys to move,
 *    Space to drop, Escape to put it back where it started.
 *
 * Nothing is reachable *only* by dragging, which is the point.
 */

type DragState = {
  /** Identifies the card being moved, so keyboard drags survive reordering. */
  stepId: number;
  /** Slot the card started in. */
  from: number;
  /** Slot it would land in if dropped now. */
  target: number;
  keyboard: boolean;
};

type Geometry = {
  tops: number[];
  heights: number[];
  gap: number;
};

const EDGE_ZONE = 88;
const EDGE_SPEED = 16;
const DRAG_THRESHOLD_PX = 5;

export function ArrangeBoard({
  cards,
  result,
  onChange,
  announce,
}: {
  cards: DrillCard[];
  result: OrderOfDrawResult | null;
  onChange: (next: DrillCard[]) => void;
  announce: (message: string) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [drag, setDragState] = useState<DragState | null>(null);
  const [settling, setSettling] = useState<number | null>(null);
  /** True from pointerdown until release, whether or not a drag began. */
  const [pointerActive, setPointerActive] = useState(false);

  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const geometry = useRef<Geometry | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const pointerRef = useRef<{
    id: number;
    index: number;
    startY: number;
    startScroll: number;
    lastY: number;
    moved: boolean;
  } | null>(null);
  const paintedRef = useRef<number[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastTops = useRef<Map<number, number>>(new Map());
  const snapshotRef = useRef<DrillCard[] | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusGuard = useRef(false);
  const gripRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());

  const locked = Boolean(result);

  const setDrag = useCallback((next: DragState | null) => {
    dragRef.current = next;
    setDragState(next);
  }, []);

  // --- Geometry ------------------------------------------------------------

  const measure = useCallback(() => {
    const tops: number[] = [];
    const heights: number[] = [];
    rowRefs.current.forEach((element, index) => {
      tops[index] = element?.offsetTop ?? 0;
      heights[index] = element?.offsetHeight ?? 0;
    });
    const gap =
      tops.length > 1
        ? Math.max(0, (tops[1] ?? 0) - ((tops[0] ?? 0) + (heights[0] ?? 0)))
        : 0;
    geometry.current = { tops, heights, gap };
  }, []);

  /**
   * Where every row sits once the dragged card lands in `target`.
   *
   * Computed from real measured heights rather than a single row height, so a
   * two-line card displaces exactly as far as it is tall. `slotTop` is where
   * the gap opens up — the empty space the card is heading for.
   */
  const previewLayout = useCallback(
    (from: number, target: number): { offsets: number[]; slotTop: number } => {
      const geo = geometry.current;
      if (!geo) return { offsets: [], slotTop: 0 };
      const order = moveCard(
        cards.map((_, index) => index),
        from,
        target,
      );
      const offsets = new Array<number>(cards.length).fill(0);
      let y = geo.tops[0] ?? 0;
      let slotTop = y;
      for (const index of order) {
        if (index === from) slotTop = y;
        offsets[index] = y - (geo.tops[index] ?? 0);
        y += (geo.heights[index] ?? 0) + geo.gap;
      }
      return { offsets, slotTop };
    },
    [cards],
  );

  const paint = useCallback(
    (delta: number, from: number, target: number) => {
      const { offsets } = previewLayout(from, target);
      paintedRef.current = offsets.slice();
      paintedRef.current[from] = delta;

      rowRefs.current.forEach((element, index) => {
        if (!element) return;
        if (index === from) {
          element.style.transition = "none";
          element.style.transform = `translate3d(0, ${delta}px, 0)`;
          return;
        }
        const offset = offsets[index] ?? 0;
        element.style.transform = offset
          ? `translate3d(0, ${offset}px, 0)`
          : "";
      });
    },
    [previewLayout],
  );

  const clearTransforms = useCallback(() => {
    rowRefs.current.forEach((element) => {
      if (!element) return;
      element.style.transition = "";
      element.style.transform = "";
    });
    paintedRef.current = [];
  }, []);

  const clampDelta = useCallback(
    (delta: number, from: number) => {
      const geo = geometry.current;
      if (!geo || cards.length === 0) return delta;
      const last = cards.length - 1;
      const min = (geo.tops[0] ?? 0) - (geo.tops[from] ?? 0);
      const max =
        (geo.tops[last] ?? 0) +
        (geo.heights[last] ?? 0) -
        (geo.heights[from] ?? 0) -
        (geo.tops[from] ?? 0);
      return Math.max(min, Math.min(max, delta));
    },
    [cards.length],
  );

  const targetFor = useCallback(
    (delta: number, from: number) => {
      const geo = geometry.current;
      if (!geo) return from;
      const center =
        (geo.tops[from] ?? 0) + delta + (geo.heights[from] ?? 0) / 2;
      let target = 0;
      for (let index = 0; index < cards.length; index += 1) {
        if (index === from) continue;
        const otherCenter = (geo.tops[index] ?? 0) + (geo.heights[index] ?? 0) / 2;
        if (otherCenter < center) target += 1;
      }
      return target;
    },
    [cards.length],
  );

  // --- Pointer dragging ----------------------------------------------------

  const cancelFrame = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    frameRef.current = null;
    const pointer = pointerRef.current;
    const current = dragRef.current;
    if (!pointer || !current || current.keyboard) return;

    // Nudge the page when the card is held against the top or bottom edge, so
    // a six-card list can be reordered on a short phone screen.
    let scrollStep = 0;
    if (pointer.lastY < EDGE_ZONE) {
      scrollStep = -EDGE_SPEED * (1 - pointer.lastY / EDGE_ZONE);
    } else if (pointer.lastY > window.innerHeight - EDGE_ZONE) {
      scrollStep =
        EDGE_SPEED * (1 - (window.innerHeight - pointer.lastY) / EDGE_ZONE);
    }
    if (scrollStep !== 0) {
      window.scrollBy(0, scrollStep);
    }

    const raw =
      pointer.lastY - pointer.startY + (window.scrollY - pointer.startScroll);
    const delta = clampDelta(raw, current.from);
    const target = targetFor(delta, current.from);
    paint(delta, current.from, target);

    if (target !== current.target) {
      setDrag({ ...current, target });
      const card = cards[current.from];
      if (card) {
        announce(`${card.name} over position ${target + 1}.`);
      }
    }

    if (scrollStep !== 0) {
      frameRef.current = requestAnimationFrame(tick);
    }
  }, [announce, cards, clampDelta, paint, setDrag, targetFor]);

  const schedule = useCallback(() => {
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const lift = useCallback(
    (index: number) => {
      measure();
      snapshotRef.current = cards;
      setPicked(null);
      setDrag({
        stepId: cards[index]?.stepId ?? -1,
        from: index,
        target: index,
        keyboard: false,
      });
      const card = cards[index];
      if (card) {
        announce(
          `${card.name} lifted from position ${index + 1}. Move to reorder, release to drop.`,
        );
      }
    },
    [announce, cards, measure, setDrag],
  );

  /**
   * Arms a drag.
   *
   * A press on the grip lifts the card straight away — that is what the grip
   * is for, and on touch the lift needs to be immediate to feel connected to
   * the finger. A press on the card body only becomes a drag once the pointer
   * has actually travelled, because that same press is also how a card is
   * tapped for a swap: lifting on mousedown would flash the whole list and
   * would clear a pick the student was halfway through making.
   *
   * Deliberately no setPointerCapture: capturing on the row retargets the
   * click that follows a mouse press to the row instead of the card button,
   * which would break tap-to-swap. The window listeners see every move and
   * release regardless.
   */
  const beginPointerDrag = useCallback(
    (index: number, event: React.PointerEvent<HTMLElement>, immediate: boolean) => {
      if (locked || dragRef.current) return;
      pointerRef.current = {
        id: event.pointerId,
        index,
        startY: event.clientY,
        startScroll: window.scrollY,
        lastY: event.clientY,
        moved: false,
      };
      setPointerActive(true);
      if (immediate) {
        pointerRef.current.moved = true;
        lift(index);
      }
    },
    [lift, locked],
  );

  /**
   * Ends a drag.
   *
   * The visual position of every row is recorded before the transforms are
   * dropped, so the layout effect below animates each card from exactly where
   * the finger left it into its new slot rather than snapping.
   */
  const endDrag = useCallback(
    (commit: boolean) => {
      const current = dragRef.current;
      if (!current) return;
      cancelFrame();

      const geo = geometry.current;
      if (geo) {
        cards.forEach((card, index) => {
          lastTops.current.set(
            card.stepId,
            (geo.tops[index] ?? 0) + (paintedRef.current[index] ?? 0),
          );
        });
      }
      clearTransforms();

      const moved = commit && current.target !== current.from;
      setDrag(null);
      pointerRef.current = null;
      snapshotRef.current = null;

      if (moved) {
        const card = cards[current.from];
        setSettling(current.stepId);
        if (settleTimer.current) clearTimeout(settleTimer.current);
        settleTimer.current = setTimeout(() => setSettling(null), 420);
        onChange(moveCard(cards, current.from, current.target));
        if (card) {
          announce(`${card.name} dropped into position ${current.target + 1}.`);
        }
      } else if (commit) {
        announce("Put back in the same position.");
      }
    },
    [announce, cancelFrame, cards, clearTransforms, onChange, setDrag],
  );

  // Pointer capture can be lost (a browser gesture, a context menu), so the
  // authoritative move/up listeners live on the window for the press's whole
  // lifetime — from the moment a finger lands, not from the moment a drag
  // starts, because the move that starts it has to be seen too.
  useEffect(() => {
    if (!pointerActive) return undefined;

    const release = () => {
      pointerRef.current = null;
      setPointerActive(false);
    };

    const onMove = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      if (!pointer || event.pointerId !== pointer.id) return;
      pointer.lastY = event.clientY;

      if (!pointer.moved) {
        if (Math.abs(event.clientY - pointer.startY) <= DRAG_THRESHOLD_PX) return;
        pointer.moved = true;
        lift(pointer.index);
      }

      // Only once a drag is genuinely under way: before that the press still
      // belongs to the page, which may want to scroll it.
      event.preventDefault();
      schedule();
    };

    const onUp = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      if (!pointer || event.pointerId !== pointer.id) return;
      const dragged = pointer.moved && dragRef.current !== null;
      // A drag that started on the card body ends with a click on that card,
      // which would otherwise be read as a tap and pick the card up again.
      // Swallow that one click and nothing else: a sticky "ignore the next
      // click" flag would eat an unrelated tap later on.
      if (dragged) swallowNextClick();
      release();
      endDrag(true);
    };

    const onCancel = () => {
      release();
      endDrag(false);
    };

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
  }, [endDrag, lift, pointerActive, schedule]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, []);

  // --- Reordering that is not a pointer drag -------------------------------

  const applyMove = useCallback(
    (from: number, to: number) => {
      if (locked || to < 0 || to >= cards.length || from === to) return;
      const card = cards[from];
      onChange(moveCard(cards, from, to));
      setPicked(null);
      if (card) {
        announce(`${card.name} moved to position ${to + 1}.`);
      }
    },
    [announce, cards, locked, onChange],
  );

  const handleCardTap = useCallback(
    (index: number) => {
      if (locked) return;
      if (picked === null) {
        setPicked(index);
        const card = cards[index];
        if (card) {
          announce(
            `${card.name} picked up from position ${index + 1}. Choose a position to swap with.`,
          );
        }
        return;
      }
      if (picked === index) {
        setPicked(null);
        announce("Put back down.");
        return;
      }
      const a = cards[picked];
      const b = cards[index];
      onChange(swapCards(cards, picked, index));
      setPicked(null);
      if (a && b) {
        announce(`Swapped ${a.name} and ${b.name}.`);
      }
    },
    [announce, cards, locked, onChange, picked],
  );

  // --- Keyboard dragging ---------------------------------------------------

  const startKeyboardDrag = useCallback(
    (index: number) => {
      const card = cards[index];
      if (!card) return;
      measure();
      snapshotRef.current = cards;
      setPicked(null);
      setDrag({ stepId: card.stepId, from: index, target: index, keyboard: true });
      announce(
        `${card.name} lifted from position ${index + 1}. Use the up and down arrows to move it, space to drop, escape to cancel.`,
      );
    },
    [announce, cards, measure, setDrag],
  );

  const dropKeyboardDrag = useCallback(() => {
    const current = dragRef.current;
    if (!current) return;
    const index = cards.findIndex((card) => card.stepId === current.stepId);
    setDrag(null);
    snapshotRef.current = null;
    setSettling(current.stepId);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setSettling(null), 420);
    announce(`Dropped into position ${index + 1}.`);
  }, [announce, cards, setDrag]);

  const cancelKeyboardDrag = useCallback(() => {
    const snapshot = snapshotRef.current;
    setDrag(null);
    snapshotRef.current = null;
    if (snapshot) {
      onChange(snapshot);
    }
    announce("Move cancelled. The card is back where it started.");
  }, [announce, onChange, setDrag]);

  const handleGripKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (locked) return;
      const current = dragRef.current;

      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        if (current?.keyboard) {
          dropKeyboardDrag();
        } else if (!current) {
          startKeyboardDrag(index);
        }
        return;
      }

      if (event.key === "Escape" && current?.keyboard) {
        event.preventDefault();
        cancelKeyboardDrag();
        return;
      }

      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
      event.preventDefault();
      const to = event.key === "ArrowUp" ? index - 1 : index + 1;
      if (to < 0 || to >= cards.length) return;

      if (current?.keyboard) {
        // React moves the row — and the focused grip inside it — through the
        // DOM. The blur that can cause is not the student letting go.
        focusGuard.current = true;
        onChange(moveCard(cards, index, to));
        announce(`Position ${to + 1} of ${cards.length}.`);
      } else {
        applyMove(index, to);
      }
    },
    [
      announce,
      applyMove,
      cancelKeyboardDrag,
      cards,
      dropKeyboardDrag,
      locked,
      onChange,
      startKeyboardDrag,
    ],
  );

  // Focus follows the card as it moves through the list.
  useLayoutEffect(() => {
    if (!drag?.keyboard) return;
    gripRefs.current.get(drag.stepId)?.focus();
    focusGuard.current = false;
  }, [cards, drag]);

  // A lifted card that loses focus is dropped rather than left hanging — but
  // not when the blur was React relocating the row mid-move.
  const handleGripBlur = useCallback(() => {
    if (focusGuard.current) return;
    if (dragRef.current?.keyboard) {
      dropKeyboardDrag();
    }
  }, [dropKeyboardDrag]);

  useEffect(() => {
    if (locked && dragRef.current) {
      setDrag(null);
      clearTransforms();
    }
  }, [clearTransforms, locked, setDrag]);

  // --- FLIP ----------------------------------------------------------------

  /**
   * Animates every layout change, wherever it came from — a drop, a move
   * button, a swap, an escaped keyboard drag. Cards are measured before and
   * after each commit and glide the difference, so the list never teleports.
   */
  useLayoutEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // A pointer drag is already painting transforms every frame; it owns them
    // until it ends. A keyboard drag reorders for real, so it animates.
    const pointerDragging =
      dragRef.current !== null && !dragRef.current.keyboard;

    cards.forEach((card, index) => {
      const element = rowRefs.current[index];
      if (!element) return;
      const top = element.offsetTop;
      const previous = lastTops.current.get(card.stepId);
      lastTops.current.set(card.stepId, top);

      if (
        previous === undefined ||
        previous === top ||
        pointerDragging ||
        reduceMotion
      ) {
        return;
      }

      element.style.transition = "none";
      element.style.transform = `translate3d(0, ${previous - top}px, 0)`;
      requestAnimationFrame(() => {
        element.style.transition = "";
        element.style.transform = "";
      });
    });
  });

  // --- Render --------------------------------------------------------------

  const dragIndex = drag
    ? cards.findIndex((card) => card.stepId === drag.stepId)
    : -1;

  /**
   * Slot numbers during a pointer drag.
   *
   * Every card shows the position it would hold if the card were dropped now,
   * not the one it holds in state — the numbers count up and down under the
   * cards as they shuffle past each other.
   */
  const previewSlots =
    drag && !drag.keyboard
      ? invert(
          moveCard(
            cards.map((_, index) => index),
            drag.from,
            drag.target,
          ),
        )
      : null;

  /**
   * The hole the lifted card left behind, drawn where it will land.
   *
   * Without it the list just has a blank space in it, which reads as a card
   * having gone missing rather than as a slot being held open.
   */
  const dropSlot =
    drag && !drag.keyboard && geometry.current
      ? {
          top: previewLayout(drag.from, drag.target).slotTop,
          height: geometry.current.heights[drag.from] ?? 0,
        }
      : null;

  return (
    <div>
      {picked !== null && !locked ? (
        <p className="mb-3 rounded-[var(--radius)] bg-primary-soft px-3.5 py-2.5 text-sm font-medium text-primary">
          Card picked up. Tap another position to swap, or tap it again to put
          it back.
        </p>
      ) : null}

      {/* The stage is the positioned ancestor every row measures against, and
          what the drop slot is placed inside. */}
      <div className="sortable-stage">
        {dropSlot ? (
          <div
            aria-hidden="true"
            className="sortable-drop-slot"
            style={{ top: `${dropSlot.top}px`, height: `${dropSlot.height}px` }}
          />
        ) : null}

        <ol
          className={cx("sortable-list space-y-2.5", drag && "is-active")}
          aria-label="Collection positions, in the order you have arranged them"
        >
          {cards.map((card, index) => {
          const cardResult = result?.results[index];
          const isPicked = picked === index;
          const isDragging = drag !== null && !drag.keyboard && drag.from === index;
          const isLifted = drag !== null && dragIndex === index;
          const slotNumber = (previewSlots?.[index] ?? index) + 1;

          let tone: CardTone = "default";
          if (cardResult?.correct) tone = "correct";
          else if (cardResult) tone = "wrong";
          else if (isLifted || isPicked) tone = "picked";

          return (
            <li
              key={card.stepId}
              ref={(element) => {
                rowRefs.current[index] = element;
              }}
              className={cx(
                "sortable-row",
                isDragging && "is-dragging",
                isLifted && "is-lifted",
                settling === card.stepId && "is-settling",
              )}
              onPointerDown={(event) => {
                // Touch keeps the card body free for scrolling and tapping;
                // a finger drag starts from the grip instead.
                if (event.pointerType === "touch" || event.button !== 0) return;
                if ((event.target as HTMLElement).closest("[data-no-drag]")) return;
                beginPointerDrag(index, event, false);
              }}
            >
              <div
                className={cx(
                  "sortable-card flex items-stretch gap-2 rounded-[var(--radius-lg)] border-2",
                  CARD_TONES[tone],
                )}
              >
                <div className="flex shrink-0 items-center gap-1.5 pl-2.5">
                  <SlotNumber value={slotNumber} tone={tone} />
                  {!locked ? (
                    <button
                      type="button"
                      ref={(element) => {
                        gripRefs.current.set(card.stepId, element);
                      }}
                      data-no-drag
                      onPointerDown={(event) => {
                        if (event.button !== 0 && event.pointerType === "mouse") return;
                        event.preventDefault();
                        beginPointerDrag(index, event, true);
                      }}
                      onKeyDown={(event) => handleGripKeyDown(event, index)}
                      onBlur={handleGripBlur}
                      aria-describedby="sortable-instructions"
                      className={cx(
                        // Narrow on phones: the grip is new width on a row
                        // that was already tight, and the card title needs it.
                        "sortable-grip flex h-11 w-6 items-center justify-center rounded-[var(--radius-sm)] sm:w-7",
                        "text-ink-subtle transition-colors hover:bg-surface-muted hover:text-ink-muted",
                        isLifted && "bg-primary text-primary-contrast hover:bg-primary",
                      )}
                    >
                      <span className="sr-only">
                        {isLifted
                          ? `${card.name} lifted. Arrow keys move it, space drops it, escape cancels.`
                          : `Drag ${card.name}, currently at position ${index + 1}. Press space to lift it.`}
                      </span>
                      <GripIcon />
                    </button>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => handleCardTap(index)}
                  disabled={locked}
                  className="flex min-h-16 flex-1 items-center gap-3 px-1 py-3 text-left disabled:cursor-default"
                >
                  <CardFace
                    card={card}
                    note={
                      cardResult ? (
                        cardResult.correct ? (
                          <CardNote tone="correct">Correct position</CardNote>
                        ) : (
                          <CardNote tone="wrong">
                            Should be position {card.position}
                          </CardNote>
                        )
                      ) : null
                    }
                  />
                </button>

                {!locked ? (
                  <div
                    data-no-drag
                    className="flex shrink-0 flex-col justify-center gap-1 pr-2"
                  >
                    <button
                      type="button"
                      onClick={() => applyMove(index, index - 1)}
                      disabled={index === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink disabled:opacity-30 disabled:hover:border-line"
                    >
                      <span className="sr-only">
                        Move {card.name} up to position {index}
                      </span>
                      <span aria-hidden="true">↑</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => applyMove(index, index + 1)}
                      disabled={index === cards.length - 1}
                      className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink disabled:opacity-30 disabled:hover:border-line"
                    >
                      <span className="sr-only">
                        Move {card.name} down to position {index + 2}
                      </span>
                      <span aria-hidden="true">↓</span>
                    </button>
                  </div>
                ) : null}
              </div>
              </li>
            );
          })}
        </ol>
      </div>

      <p id="sortable-instructions" className="sr-only">
        Press space or enter to lift a card, the up and down arrow keys to move
        it, space again to drop it, and escape to cancel the move.
      </p>
    </div>
  );
}

/**
 * Eats the click that a completed mouse drag leaves behind, and only that one.
 *
 * The listener is armed in capture so it runs before the card's own handler,
 * and torn down on the next task — a drag that produces no click (every touch
 * drag, and any drag released off the card) must not leave a trap set for
 * whatever the student taps next.
 */
function swallowNextClick(): void {
  const handler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };
  window.addEventListener("click", handler, { capture: true, once: true });
  setTimeout(() => {
    window.removeEventListener("click", handler, { capture: true });
  }, 0);
}

/** `order[slot] = card` becomes `slots[card] = slot`. */
function invert(order: number[]): number[] {
  const slots = new Array<number>(order.length).fill(0);
  order.forEach((cardIndex, slot) => {
    slots[cardIndex] = slot;
  });
  return slots;
}

function GripIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="currentColor"
    >
      {[5, 10, 15].map((y) =>
        [3.5, 8.5].map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.35" />
        )),
      )}
    </svg>
  );
}
