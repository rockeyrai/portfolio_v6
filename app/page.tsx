"use client";

import { useTheme } from "./provider/ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-bg text-text">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        className="bg-bg text-text w-20"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="midnight">Midnight</option>
      </select>
    </div>
  );
}
