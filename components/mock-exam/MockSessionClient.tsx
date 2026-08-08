"use client";

import { useSearchParams } from "next/navigation";
import { MockRunner } from "./MockRunner";

/**
 * Reads the exam's start/restart intent from the URL on the client.
 *
 * See `PracticeSessionClient` — the app is a static export, so search params
 * are only available in the browser.
 */
export function MockSessionClient() {
  const searchParams = useSearchParams();

  return (
    <MockRunner
      start={searchParams.get("start") === "1"}
      restart={searchParams.get("restart") === "1"}
    />
  );
}
