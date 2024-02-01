"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import RegisterForm from "../shared/register-form";

export default function RegisterModal() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Dialog
        defaultOpen
        /* open={pathname.includes("/login")} */
        onOpenChange={() => router.back()}
      >
        <DialogContent className="max-w-80">
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
          </DialogHeader>
          <RegisterForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
