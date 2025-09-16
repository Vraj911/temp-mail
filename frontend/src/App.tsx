import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GenerateEmail from "./pages/GenerateEmail";
import API from "./pages/API";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Configurations from "./pages/Configuration";
import Customization from "./pages/Customization";
import Security from "./pages/Security";
import Privacy from "./pages/Privacy";
const queryClient = new QueryClient();
const Layout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 bg-background">
        <div className="border-b border-border p-4 md:hidden">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </div>
  </SidebarProvider>
);
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/generate" element={<Layout><GenerateEmail /></Layout>} />
          <Route path="/api" element={<Layout><API /></Layout>} />
          <Route path="/stats" element={<Layout><Stats /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/configurations" element={<Layout><Configurations /></Layout>} />
          <Route path="/customization" element={<Layout><Customization /></Layout>} />
          <Route path="/security" element={<Layout><Security /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
