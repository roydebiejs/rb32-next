import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthErrorPage = () => {
  return (
    <div>
      <h1 className="text-center">Something went wrong...</h1>
      <br />
      <Link
        href="/login"
        className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
      >
        <Button variant="secondary" className="w-full">
          Back to login
        </Button>
      </Link>
    </div>
  );
};

export default AuthErrorPage;
