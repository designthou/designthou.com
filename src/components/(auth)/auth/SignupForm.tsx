"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  SignUpSchema,
  signUpSchema,
} from "@/components";
import { route } from "@/constants";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function SignupForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: SignUpSchema) => {
    const { email, password, nickname } = values;
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/signup/confirm",
          data: {
            nickname,
          },
        },
      });

      if (!error) {
        form.reset();
        toast.success("이메일을 확인해 주세요. 인증 후 로그인 가능합니다.");

        const { error } = await supabase.from("users").insert({
          email,
          nickname,
          display_name: nickname,
          user_login: "email",
          user_registered: new Date().toISOString(),
        });

        if (error) {
          throw new Error(error.message);
        }

        router.push(route.AUTH.LOGIN);
        router.refresh();
      } else {
        // TODO: 닉네임 검증
        if (error.message.includes("already registered")) {
          form.setError("email", {
            message: "이미 가입된 이메일입니다",
          });

          throw error;
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("회원가입이 불가능합니다.");
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4 p-4 bg-white rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 mt-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="hello@gmail.com"
                    {...field}
                  />
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
                <FormLabel>비밀번호</FormLabel>

                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>

                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="디자인도우" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" size="lg">
            가입하기
          </Button>
        </form>
      </Form>

      <div className="flex flex-col items-center gap-4">
        <Button asChild variant="link" className="mx-auto text-center">
          <Link href={route.AUTH.LOGIN}>Already have an account?</Link>
        </Button>
        <div className="text-sm font-medium text-gray-700">
          By proceeding, you agree to our{" "}
          <Link
            href={route.SERVICE.TERMS}
            target="_blank"
            className="underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href={route.SERVICE.PRIVACY}
            target="_blank"
            className="underline"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
