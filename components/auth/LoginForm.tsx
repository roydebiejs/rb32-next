"use client";
import * as z from "zod";
import React, { useTransition, useState } from "react";
import { TemplateForm } from "./TemplateForm";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <>
      <TemplateForm headerText="Log in to your account">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="john.doe@example.com"
                        autoComplete="off"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="******"
                        autoComplete="off"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" variant="default" className="w-full">
              Log in
            </Button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
            >
              Create one
            </Link>
          </p>
        </Form>
      </TemplateForm>
    </>
  );
};
