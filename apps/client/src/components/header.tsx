import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu } from "lucide-react";
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="bg-white shadow-sm border-b border-coral/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-coral rounded-xl flex items-center justify-center">
                <BookOpen className="text-white" size={20} />
              </div>
              <span className="font-poppins font-bold text-2xl text-navy">
                Echoberry
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#how-it-works"
              className="text-navy hover:text-coral font-medium transition-colors"
            >
              How it Works
            </a>
            <a
              href="#gallery"
              className="text-navy hover:text-coral font-medium transition-colors"
            >
              Gallery
            </a>
            <a
              href="#pricing"
              className="text-navy hover:text-coral font-medium transition-colors"
            >
              Pricing
            </a>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button className="bg-coral text-white hover:bg-coral/90 rounded-full font-medium">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="text-navy" size={24} />
          </Button>
        </div>
      </div>
    </header>
  );
}
