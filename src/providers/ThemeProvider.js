"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";

function ThemeProvider({ children }) {
  return <NextThemeProvider>{children}</NextThemeProvider>;
}

export default ThemeProvider;
