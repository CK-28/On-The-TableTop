"use client";

import React from "react";
import { useAtomValue } from "jotai";
import { isHydratedAtom } from "@/app/store";

export default function HydrationGuard({ children }: { children: React.ReactNode }) {
  const isHydrated = useAtomValue(isHydratedAtom);

  if (!isHydrated) return <div />;

  return <>{children}</>;
}
