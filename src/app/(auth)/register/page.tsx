import RegisterForm from "@/components/shared/register-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {};

export default async function Page({}: Props) {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
