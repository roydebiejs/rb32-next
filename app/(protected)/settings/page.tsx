"use client";

import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {JSON.stringify(session)}!</p>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
};
export default SettingsPage;
