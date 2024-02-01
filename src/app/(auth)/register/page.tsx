import RegisterForm from "@/components/shared/register-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {};

export default async function Page({}: Props) {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center gap-4">
        <RegisterForm />
        <Button variant="link" asChild className="w-full">
          <Link href="/">Back to Home</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
