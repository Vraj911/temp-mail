import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmailCard } from "@/components/EmailCard";
import { Mail, RefreshCw, Clock, Shield, Zap, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { fetchEmails, Email } from "@/api/emails"; 
import axios from "axios";

export default function GenerateEmail() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [customPrefix, setCustomPrefix] = useState("");
  const [duration, setDuration] = useState("10");
  const [generating, setGenerating] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getEmails = async () => {
      try {
        const data = await fetchEmails();
        setEmails(data);
      } catch (err) {
        console.error("Error fetching emails:", err);
      } finally {
        setLoading(false);
      }
    };
    getEmails();
  }, []);
  const handleGenerate = async () => {
  setGenerating(true);
  try {
    const response = await axios.post(`${BACKEND_URL}/api/generate/emails`, {
      prefix: customPrefix || undefined, 
      duration: parseInt(duration),      
      user_id: "64f9e6a1f8a4b2c3d4e5f678"            
    });
    const newEmail = response.data.email;
    setEmails(prev => [newEmail, ...prev]);
    toast({
      title: "Email Generated",
      description: `Your temporary email: ${newEmail.address}`,
    });
    setCustomPrefix(""); 
  } catch (error) {
    console.error("Error generating email:", error);
    toast({
      title: "Error",
      description: "Could not generate email. Try again later.",
      variant: "destructive"
    });
  } finally {
    setGenerating(false);
  }
};
  const quickGenerate = async () => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/generate/emails`, {
      duration: 10,
      user_id: "64f9e6a1f8a4b2c3d4e5f678" 
    });
    const newEmail = response.data.email; 
    setEmails(prev => [newEmail, ...prev]);
    toast({
      title: "Quick Email Generated",
      description: `Your temporary email: ${newEmail.address}`,
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Could not generate quick email.",
      variant: "destructive"
    });
  }
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
              <Button onClick={quickGenerate} className="w-full bg-primary hover:bg-primary-hover text-primary-foreground animate-fade-in">
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
                  <Label htmlFor="prefix" className="text-sm text-card-foreground">Custom Prefix (Optional)</Label>
                  <Input
                    id="prefix"
                    value={customPrefix}
                    onChange={(e) => setCustomPrefix(e.target.value)}
                    placeholder="e.g., temp123"
                    className="bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Leave empty for random generation</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm text-card-foreground">Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="bg-input border-border text-foreground"><SelectValue /></SelectTrigger>
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
                <code className="text-sm text-primary font-mono">{customPrefix || "random"}_temp@mailpro.com</code>
              </div>
              <Button onClick={handleGenerate} disabled={generating} className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
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
                {emails.length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <p className="text-muted-foreground col-span-full text-center">Loading emails...</p>
              ) : emails.length > 0 ? (
                emails.map((email, index) => (
                  <div key={index} className="animate-fade-in hover-scale">
                    <EmailCard email={email.address} expiresIn={
                      email.expires_at ? Math.ceil((new Date(email.expires_at).getTime() - Date.now()) / (1000*60)) : 0
                    } />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center">No emails yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
