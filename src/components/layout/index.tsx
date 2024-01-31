import { ReactNode } from "react";
import { Toaster } from "../ui/toaster";
import { ThemeProvider } from "./theme-provider";

export default function LayoutProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
      <Toaster />
    </>
  );
}
