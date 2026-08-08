import { describe, expect, it } from "vitest";
import {
  describePracticeMode,
  parsePracticeConfig,
  practiceHref,
} from "@/components/practice/modes";
import { canAccess, PLANS, getCurrentPlan } from "@/lib/entitlements";

describe("parsePracticeConfig", () => {
  it("defaults to a quick ten when nothing is supplied", () => {
    expect(parsePracticeConfig({})).toEqual({
      mode: "quick-10",
      certificationId: "nha-cpt",
      domainId: undefined,
      questionCount: 10,
    });
  });

  it("reads a valid mode, domain, and count", () => {
    expect(
      parsePracticeConfig({ mode: "domain", domain: "order-of-draw", count: "25" }),
    ).toEqual({
      mode: "domain",
      certificationId: "nha-cpt",
      domainId: "order-of-draw",
      questionCount: 25,
    });
  });

  it("falls back on an unknown mode rather than producing a broken session", () => {
    // These values come from a link a student can edit by hand.
    expect(parsePracticeConfig({ mode: "hack" }).mode).toBe("quick-10");
  });

  it("ignores an unknown domain", () => {
    expect(
      parsePracticeConfig({ mode: "domain", domain: "not-a-domain" }).domainId,
    ).toBeUndefined();
  });

  it("drops a domain that was passed to a non-domain mode", () => {
    expect(
      parsePracticeConfig({ mode: "quick-10", domain: "order-of-draw" }).domainId,
    ).toBeUndefined();
  });

  it("clamps the question count into a sane range", () => {
    expect(parsePracticeConfig({ count: "1" }).questionCount).toBe(5);
    expect(parsePracticeConfig({ count: "9999" }).questionCount).toBe(60);
    expect(parsePracticeConfig({ count: "-4" }).questionCount).toBe(5);
  });

  it("falls back to the mode default on a non-numeric count", () => {
    expect(parsePracticeConfig({ mode: "weak-areas", count: "abc" }).questionCount).toBe(15);
  });

  it("handles repeated query parameters", () => {
    expect(parsePracticeConfig({ mode: ["missed", "quick-10"] }).mode).toBe("missed");
  });
});

describe("practiceHref", () => {
  it("round-trips through parsePracticeConfig", () => {
    const href = practiceHref("domain", { count: 15, domainId: "complications" });
    const query = Object.fromEntries(
      new URLSearchParams(href.split("?")[1] ?? ""),
    );

    expect(parsePracticeConfig(query)).toEqual({
      mode: "domain",
      certificationId: "nha-cpt",
      domainId: "complications",
      questionCount: 15,
    });
  });
});

describe("describePracticeMode", () => {
  it("names the area for a single-domain session", () => {
    expect(
      describePracticeMode({
        mode: "domain",
        certificationId: "nha-cpt",
        domainId: "specimen-handling",
        questionCount: 10,
      }),
    ).toBe("Specimen Handling");
  });

  it("names the mode otherwise", () => {
    expect(
      describePracticeMode({
        mode: "weak-areas",
        certificationId: "nha-cpt",
        questionCount: 15,
      }),
    ).toBe("Weak areas");
  });
});

describe("entitlements", () => {
  it("unlocks everything during the open preview", () => {
    const plan = getCurrentPlan();
    expect(canAccess("mock-exams", plan)).toBe(true);
    expect(canAccess("full-question-bank", plan)).toBe(true);
  });

  it("keeps study guides and both drills on the free plan", () => {
    // The promise made on the pricing page, asserted in code.
    expect(canAccess("study-guides", PLANS.free)).toBe(true);
    expect(canAccess("order-of-draw-drill", PLANS.free)).toBe(true);
    expect(canAccess("tube-drill", PLANS.free)).toBe(true);
  });

  it("reserves the full bank and mock exams for the paid plan", () => {
    expect(canAccess("full-question-bank", PLANS.free)).toBe(false);
    expect(canAccess("mock-exams", PLANS.free)).toBe(false);
    expect(canAccess("full-question-bank", PLANS.pro)).toBe(true);
    expect(canAccess("mock-exams", PLANS.pro)).toBe(true);
  });
});
