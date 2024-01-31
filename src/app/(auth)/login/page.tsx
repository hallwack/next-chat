import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./form";

type Props = {};

export default async function Page({}: Props) {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
