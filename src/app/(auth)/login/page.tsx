import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./form";

type Props = {};

export default function Page({ }: Props) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
