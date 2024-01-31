import { validateRequest } from "@/lib/auth/validateRequest";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      {children}
    </div>
  );
}
