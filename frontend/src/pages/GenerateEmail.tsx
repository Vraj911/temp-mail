import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmailCard } from "@/components/EmailCard";
import {
  Mail,
  RefreshCw,
  Clock,
  Shield,
  Zap,
  Copy,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
const generatedEmails = [
  { email: "temp123@mailpro.com", expiresIn: 10 },
  { email: "temp456@mailpro.com", expiresIn: 15 },
  { email: "temp789@mailpro.com", expiresIn: 20 },
];
export default function GenerateEmail() {
  const [customPrefix, setCustomPrefix] = useState("");
  const [duration, setDuration] = useState("10");
  const [generating, setGenerating] = useState(false);
  const handleGenerate = async () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast({
        title: "Email Generated",
        description: "Your temporary email has been created successfully.",
      });
    }, 1000);
  };
  const quickGenerate = () => {
    toast({
      title: "Quick Email Generated",
      description: "temp" + Math.random().toString(36).substring(7) + "@mailpro.com",
    });
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Generate Email</h1>
          <p className="text-muted-foreground">Create temporary email addresses with custom settings</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border shadow-custom-lg">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Generate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Generate a temporary email instantly with default settings
              </p>           
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">10 minutes duration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Auto-delete enabled</span>
                </div>
              </div>
              <Button 
                onClick={quickGenerate}
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground animate-fade-in"
              >
                <Mail className="h-4 w-4 mr-2" />
                Generate Now
              </Button>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2 bg-card border-border shadow-custom-lg">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Custom Email Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prefix" className="text-sm text-card-foreground">
                    Custom Prefix (Optional)
                  </Label>
                  <Input
                    id="prefix"
                    value={customPrefix}
                    onChange={(e) => setCustomPrefix(e.target.value)}
                    placeholder="e.g., mytemp"
                    className="bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty for random generation
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm text-card-foreground">
                    Duration
                  </Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="1440">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-sm font-medium text-card-foreground mb-2">Preview:</p>
                <code className="text-sm text-primary font-mono">
                  {customPrefix || "random"}_temp@mailpro.com
                </code>
              </div>
              <Button 
                onClick={handleGenerate}
                disabled={generating}
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                {generating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Generate Custom Email
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-card border-border shadow-custom-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Active Temporary Emails
              </CardTitle>
              <Badge variant="secondary" className="animate-pulse">
                {generatedEmails.length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedEmails.map((email, index) => (
                <div key={index} className="animate-fade-in hover-scale">
                  <EmailCard {...email} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border shadow-custom-md hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">24</p>
                  <p className="text-sm text-muted-foreground">Emails Generated Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-custom-md hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">6</p>
                  <p className="text-sm text-muted-foreground">Minutes Average Duration</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-custom-md hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">Privacy Protected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}