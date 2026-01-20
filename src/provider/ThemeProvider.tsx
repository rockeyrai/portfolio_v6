"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { db } from "../lib/db";
import { setUsers } from "../redux/slices/userSlices";

type Theme = "light" | "dark" | "midnight";

type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("light");
  useEffect(() => {
    // Load initial data from Dexie
    db.users.toArray().then((users) => store.dispatch(setUsers(users)));
  }, []);
  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme;
    if (current) setThemeState(current);
  }, []);

  const setTheme = (t: Theme) => {
    document.documentElement.dataset.theme = t;
    document.cookie = `theme=${t}; path=/; max-age=31536000`;
    setThemeState(t);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
