"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

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
    router.refresh();
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
          <Link
            href="/login/google"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full !space-x-3",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="!w-5 h-5 fill-[#4285F4]"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
            </svg>
            <span>Login with Google Account</span>
          </Link>
          <Button type="button" variant="outline" className="w-full" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
