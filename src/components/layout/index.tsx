import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

export default function LayoutProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
