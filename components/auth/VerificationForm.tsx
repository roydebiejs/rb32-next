"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";

import { verification } from "@/actions/verification";
import { FormError } from "../FormError";

export const VerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>(undefined);

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Token not found");
      return;
    }

    await verification(token)
      .then(async (data) => {
        if (data.error) {
          setError(data.error);
        }
      })
      .catch(() => {
        setError("An error occurred");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Confirming your email...
        </h2>
      </div>
      {!error && (
        <p className="text-center mb-6 pt-2">
          <BeatLoader />
        </p>
      )}
      <FormError message={error} />
      {error && <br />}
      <Link href="/login">
        <Button variant="secondary" className="w-full">
          Back to login
        </Button>
      </Link>
    </div>
  );
};
