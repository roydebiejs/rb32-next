import React from "react";
import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </>
  );
};

export default SettingsPage;
