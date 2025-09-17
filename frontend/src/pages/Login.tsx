import { useState } from "react";
import { Mail, Facebook, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">RapidMail</h1>
          </div>
          <h2 className="text-lg text-muted-foreground">
            Welcome to RapidMail
          </h2>
        </div>
        <Card className="bg-card border-border shadow-custom-lg">
          <CardHeader className="space-y-1">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-card-foreground">
                {isLogin ? "Sign in to your account" : "Create an account"}
              </h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-card-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-card-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-border">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex-1 border-border">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex-1 border-border">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-primary hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
              {isLogin && (
                <div>
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}