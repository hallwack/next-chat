import { ReactNode } from "react";
import Header from "@/components/layout/header";

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <Header />
      {children}
    </div>
  );
}
