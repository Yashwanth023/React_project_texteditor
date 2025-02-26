
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sun, Moon, Laptop, Sparkles, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = () => {
    setIsOpen(false);
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="size-8 rounded-lg bg-primary/10 p-1">
                <Sparkles className="size-full text-primary" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                Nexus Flow
              </span>
            </Link>
          </div>

          {isAuthenticated && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/"
                  className="text-sm hover:text-primary transition-colors px-3 py-1.5 rounded-md border border-transparent hover:border-primary/20"
                >
                  Dashboard
                </Link>
                <Link
                  to="/counter"
                  className="text-sm hover:text-primary transition-colors px-3 py-1.5 rounded-md border border-transparent hover:border-primary/20"
                >
                  Counter
                </Link>
                <Link
                  to="/user-form"
                  className="text-sm hover:text-primary transition-colors px-3 py-1.5 rounded-md border border-transparent hover:border-primary/20"
                >
                  User Form
                </Link>
                <Link
                  to="/text-editor"
                  className="text-sm hover:text-primary transition-colors px-3 py-1.5 rounded-md border border-transparent hover:border-primary/20"
                >
                  Text Editor
                </Link>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="size-9">
                      <Menu className="size-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-4 mt-4">
                      <Link
                        to="/"
                        onClick={handleNavigate}
                        className="text-sm hover:text-primary transition-colors px-3 py-2 rounded-md border border-transparent hover:border-primary/20"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/counter"
                        onClick={handleNavigate}
                        className="text-sm hover:text-primary transition-colors px-3 py-2 rounded-md border border-transparent hover:border-primary/20"
                      >
                        Counter
                      </Link>
                      <Link
                        to="/user-form"
                        onClick={handleNavigate}
                        className="text-sm hover:text-primary transition-colors px-3 py-2 rounded-md border border-transparent hover:border-primary/20"
                      >
                        User Form
                      </Link>
                      <Link
                        to="/text-editor"
                        onClick={handleNavigate}
                        className="text-sm hover:text-primary transition-colors px-3 py-2 rounded-md border border-transparent hover:border-primary/20"
                      >
                        Text Editor
                      </Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="size-9">
                  <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="size-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="size-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="size-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated ? (
              <Button variant="outline" onClick={logout} className="border border-primary/20">
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button className="border border-primary/20">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
