"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const user = useCurrentUser();

  // For some reason this is necessary to make sure the session is loaded
  // It looks like setting the session takes longer than the initial render
  if (!user) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
    </div>
  );
};
export default DashboardPage;
