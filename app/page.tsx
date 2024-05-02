import React from "react";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6">
        <h1 className="text-6xl font-semibold text-black drop-shadow-md">
          Auth
        </h1>
        <p>a simple auth</p>
        <LoginButton>
          <Button variant="destructive">Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
