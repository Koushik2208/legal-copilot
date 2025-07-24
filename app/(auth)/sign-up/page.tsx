import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <form className="space-y-4">
      {/* Full Name */}
      <Input type="text" placeholder="Full Name" required />

      {/* Email */}
      <Input type="email" placeholder="Email" required />

      {/* Password */}
      <Input type="password" placeholder="Password" required />

      {/* Confirm Password */}
      <Input type="password" placeholder="Confirm Password" required />

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Create Account
      </Button>

      {/* Footer */}
      <p className="text-sm text-muted text-center">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
