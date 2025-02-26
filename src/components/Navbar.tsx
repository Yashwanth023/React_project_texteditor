
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-semibold">
            Dashboard
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/counter" className="text-sm hover:text-primary transition-colors">
                Counter
              </Link>
              <Link to="/user-form" className="text-sm hover:text-primary transition-colors">
                User Form
              </Link>
              <Link to="/text-editor" className="text-sm hover:text-primary transition-colors">
                Text Editor
              </Link>
            </>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
