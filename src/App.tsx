import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Counter from "./pages/Counter";
import UserForm from "./pages/UserForm";
import TextEditor from "./pages/TextEditor";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login";

  const getBackgroundClass = () => {
    if (isAuthPage) {
      return "min-h-screen bg-gradient-to-br from-purple-500/20 to-purple-700/30 via-purple-600/25";
    }
    if (location.pathname === "/") {
      return "min-h-screen";  // Dashboard has its own gradient
    }
    return "min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 via-blue-50";
  };

  return (
    <div className={getBackgroundClass()}>
      <Navbar />
      <main className="container mx-auto px-4 py-4 md:py-8">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <AuthProvider>
            <BrowserRouter>
              <PageWrapper>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/counter" element={<PrivateRoute><Counter /></PrivateRoute>} />
                  <Route path="/user-form" element={<PrivateRoute><UserForm /></PrivateRoute>} />
                  <Route path="/text-editor" element={<PrivateRoute><TextEditor /></PrivateRoute>} />
                </Routes>
              </PageWrapper>
            </BrowserRouter>
          </AuthProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
