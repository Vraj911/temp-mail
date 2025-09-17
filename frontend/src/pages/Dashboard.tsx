import { EmailCard } from "@/components/EmailCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom";
import {
  Mail,
  Send,
  BarChart3,
  Calendar,
  Download,
  Forward,
  Sparkles
} from "lucide-react";
const mockEmails = [
  { email: "temp123@mailpro.com", expiresIn: 10 },
  { email: "temp456@mailpro.com", expiresIn: 15 },
  { email: "temp789@mailpro.com", expiresIn: 20 },
];
const mockInboxEmails = [
  { from: "John Smith", subject: "Welcome to our service", time: "2 min ago" },
  { from: "Jane Doe", subject: "Check your inbox", time: "5 min ago" },
  { from: "Alice Brown", subject: "Important update", time: "10 min ago" },
];
const statsData = [
  { label: "Total emails received this week", value: "8", icon: Mail },
  { label: "Total emails sent this week", value: "16", icon: Send },
];
export default function Dashboard() {
  const navigate = useNavigate();
   const location = useLocation();
   const username = location.state?.username || "User";
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {username}!</h1>
            <p className="text-muted-foreground">Your temporary emails:</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground"  onClick={() => navigate("/generate")}>
              <Mail className="h-4 w-4 mr-2" />
              Start a new email
            </Button>
            <Button variant="outline" className="border-border">
              <Send className="h-4 w-4 mr-2" />
              Send email
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockEmails.map((email, index) => (
            <EmailCard key={index} {...email} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-muted rounded-sm flex items-center justify-center text-xs text-muted-foreground"
                  >
                    {((i % 7) + 1)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockInboxEmails.map((email, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded hover:bg-muted/50">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">{email.from}</p>
                    <p className="text-xs text-muted-foreground truncate">{email.subject}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      Quick Insights
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg text-card-foreground">Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {statsData.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="text-2xl font-bold text-card-foreground">{stat.value}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${(parseInt(stat.value) / 20) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Card className="bg-card border-border shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Live Inbox</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockInboxEmails.map((email, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-sm">
                      <span className="font-medium text-card-foreground">Email from: {email.from}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Forward className="h-3 w-3 mr-1" />
                      Forward
                    </Button>
                    <Button variant="outline" size="sm">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI Summary
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}