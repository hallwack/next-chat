import { ReactNode } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-primary-foreground">
        <div className="container flex h-24 items-center justify-between">
          <h1 className="text-2xl font-bold leading-6">
            NextApp
          </h1>
          <nav className="flex items-center gap-4">
            <ul className="flex gap-8">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </ul>
            <ul className="flex gap-8" />
            <ul className="flex gap-8">
              <ModeToggle />
            </ul>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
