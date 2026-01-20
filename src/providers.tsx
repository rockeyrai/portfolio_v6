// app/providers.tsx
'use client';

import { ThemeProvider } from "./provider/ThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
