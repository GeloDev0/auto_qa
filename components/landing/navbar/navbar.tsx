import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="h-16 bg-background border-b border-accent">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <Button
                variant="outline"
                className="hidden sm:inline-flex rounded-full"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
