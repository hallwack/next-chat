import DropdownUser from "@/components/dropdown-user";
import { ModeToggle } from "@/components/mode-toggle";
import { validateRequest } from "@/lib/auth/validateRequest";
import Link from "next/link";

export default async function Header() {
  const { session, user } = await validateRequest();
  return (
    <div className="w-full bg-primary-foreground">
      <div className="container flex h-24 items-center justify-between">
        <h1 className="text-2xl font-bold leading-6">NextApp</h1>
        <nav className="flex gap-16">
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
          <ul className="flex items-center gap-8">
            {session ? (
              <li>
                <DropdownUser user={user} />
              </li>
            ) : (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
