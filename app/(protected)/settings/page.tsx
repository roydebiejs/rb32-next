"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const SettingsPage = () => {
  const user = useCurrentUser();

  // For some reason this is necessary to make sure the session is loaded
  // It looks like setting the session takes longer than the initial render
  if (!user) {
    window.location.href = "/settings";
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {JSON.stringify(user)}!</p>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
};
export default SettingsPage;
