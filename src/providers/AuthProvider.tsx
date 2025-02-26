
import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock authentication
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: User) => u.email === email);
    
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials.",
      });
    }
  };

  const signup = (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.some((u: User) => u.email === email);
    
    if (exists) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User already exists.",
      });
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      name,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast({
      title: "Welcome!",
      description: "Your account has been created successfully.",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Goodbye!",
      description: "You have been logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
