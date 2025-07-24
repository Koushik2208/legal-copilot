import type { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION } from "@/constants/metadata";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="border-b background-card">
        <div className="section-wrapper flex items-center justify-between py-4">
          {/* Logo / App Name */}
          <Link href="/" className="text-heading gradient-text">
            {APP_NAME}
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4">
            <Link href="/search">
              <Button variant="ghost" className="text-sm font-medium">
                Search
              </Button>
            </Link>
            <Link href="/draft">
              <Button variant="ghost" className="text-sm font-medium">
                Draft
              </Button>
            </Link>
            <Link href="/summarize">
              <Button variant="ghost" className="text-sm font-medium">
                Summarize
              </Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </header>

      {/* Vertically Centered Content */}
      <main className="flex-grow">
        <div className="flex items-center justify-center h-full py-12">
          <div className="section-wrapper w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
