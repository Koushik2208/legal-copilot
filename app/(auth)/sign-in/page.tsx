import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignInPage() {
  return (
    <form className="space-y-4">
      <Input type="email" placeholder="Email" required />
      <Input type="password" placeholder="Password" required />

      <Button type="submit" className="w-full">
        Sign In
      </Button>

      <p className="text-sm text-muted text-center">
        Don't have an account?{" "}
        <Link href="/sign-up" className="underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
