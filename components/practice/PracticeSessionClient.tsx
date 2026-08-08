"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PracticeRunner } from "./PracticeRunner";
import { parsePracticeConfig } from "./modes";

/**
 * Reads the session configuration from the URL on the client.
 *
 * The app builds as a static export, so there is no request to read search
 * params from on the server. `parsePracticeConfig` is defensive about what it
 * finds either way — these values come from a link a student can edit.
 */
export function PracticeSessionClient() {
  const searchParams = useSearchParams();

  const config = useMemo(
    () => parsePracticeConfig(Object.fromEntries(searchParams.entries())),
    [searchParams],
  );

  return <PracticeRunner config={config} />;
}
