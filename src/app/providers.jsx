"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function Providers({ children }) {
  const { push } = useRouter();
  return <NextUIProvider navigate={push}>{children}</NextUIProvider>;
}
