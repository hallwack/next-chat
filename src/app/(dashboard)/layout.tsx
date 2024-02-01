import { ReactNode } from "react";
import { validateRequest } from "@/lib/auth/validateRequest";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = await validateRequest();

  if (!user) redirect("/login");

  return <div className="flex flex-col min-h-screen">{children}</div>;
}
