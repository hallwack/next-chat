"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/validation/loginSchema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type LoginSchema = z.infer<typeof loginSchema>;

const loginSubmit = async (values: LoginSchema) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(values),
  });

  return res.json();
};

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    const response = await loginSubmit(values);
    if (!response.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.message,
      });
    }
    toast({
      variant: "default",
      title: "Success",
      description: response.message,
    });
    router.push("/");
    router.refresh()
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <Button type="submit" variant="default" className="w-full">
            Login
          </Button>
          <Button type="button" variant="outline" className="w-full" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
