"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const REFRESH_INTERVAL_MS = 15_000;

export function LiveDataRefresh() {
  const router = useRouter();

  useEffect(() => {
    const refresh = () => router.refresh();
    const interval = window.setInterval(refresh, REFRESH_INTERVAL_MS);

    window.addEventListener("focus", refresh);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
    };
  }, [router]);

  return null;
}
