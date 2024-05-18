"use client";
import * as z from "zod";
import React, { useTransition, useState } from "react";
import { TemplateForm } from "./TemplateForm";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdatePasswordSchema } from "@/schemas";
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
import { FormSuccess } from "../FormSuccess";
import { useSearchParams } from "next/navigation";
import { updatePassword } from "@/actions/updatePassword";

export const UpdatePasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
    startTransition(() => {
      updatePassword(values, token).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <>
      <TemplateForm headerText="Enter a new password">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
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
              Update password
            </Button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            <Link
              href="/login"
              className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
            >
              Back to login
            </Link>
          </p>
        </Form>
      </TemplateForm>
    </>
  );
};
