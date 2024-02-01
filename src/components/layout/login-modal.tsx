"use client";

import { usePathname, useRouter } from "next/navigation";
import LoginForm from "../shared/login-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function LoginModal() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Dialog
        open={pathname.includes("/login")}
        onOpenChange={() => router.back()}
      >
        <DialogContent className="max-w-80">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
