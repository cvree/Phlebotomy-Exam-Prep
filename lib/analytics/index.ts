/**
 * Analytics.
 *
 * No provider is connected. This exists so that product events are named and
 * emitted from one place, and connecting a provider later is a single
 * `setAnalyticsSink` call rather than a hunt through components.
 *
 * Privacy rule, enforced by the `AnalyticsProperties` type: event properties
 * are counts, identifiers of *content*, and enum-ish strings. No free text, no
 * answers a student gave, and nothing about the student themselves. This is a
 * healthcare-adjacent product and study behavior is not something we want to
 * accidentally start collecting.
 */

export type AnalyticsEvent =
  | "practice_started"
  | "question_answered"
  | "practice_completed"
  | "explanation_viewed"
  | "weak_area_practice_started"
  | "order_draw_started"
  | "order_draw_completed"
  | "tube_drill_started"
  | "tube_drill_completed"
  | "mock_exam_started"
  | "mock_exam_resumed"
  | "mock_exam_completed"
  | "mock_exam_reviewed"
  | "progress_viewed"
  | "pricing_viewed"
  | "upgrade_clicked"
  | "progress_reset"
  | "progress_exported";

export type AnalyticsProperties = Record<string, string | number | boolean>;

export type AnalyticsSink = (
  event: AnalyticsEvent,
  properties: AnalyticsProperties,
) => void;

let sink: AnalyticsSink | null = null;

/** In-memory ring buffer, so the app can show its own event log in dev. */
const buffer: { event: AnalyticsEvent; properties: AnalyticsProperties; at: string }[] =
  [];
const BUFFER_LIMIT = 100;

export function setAnalyticsSink(next: AnalyticsSink | null): void {
  sink = next;
}

export function track(
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
): void {
  buffer.push({ event, properties, at: new Date().toISOString() });
  if (buffer.length > BUFFER_LIMIT) {
    buffer.shift();
  }

  if (sink) {
    try {
      sink(event, properties);
    } catch {
      // Analytics must never break a study session.
    }
  }
}

export function getRecentEvents(): ReadonlyArray<{
  event: AnalyticsEvent;
  properties: AnalyticsProperties;
  at: string;
}> {
  return buffer;
}
