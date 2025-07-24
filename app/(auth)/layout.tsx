import type { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `${APP_NAME} | Auth`,
  description: APP_DESCRIPTION,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-lg p-6 card-base border rounded-xl shadow-md">
        {/* Logo / App Title */}
        <div className="mb-8 text-center">
          <h1 className="text-heading gradient-text">LegalCopilot</h1>
          <p className="text-subheading">
            Sign in to continue your legal AI journey.
          </p>
        </div>

        {/* Auth Form Content */}
        {children}

        {/* Optional Footer */}
        <div className="mt-6 text-sm text-muted text-center">
          LegalCopilot © {new Date().getFullYear()}
        </div>
      </main>
    </div>
  );
}
