import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailCard } from "@/components/EmailCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Forward, Sparkles, Plus } from "lucide-react";

const emailAccounts = [
  { email: "temp123@mailpro.com", expiresIn: 10 },
  { email: "temp456@mailpro.com", expiresIn: 15 },
  { email: "temp789@mailpro.com", expiresIn: 20 }
];

const emails = [
  { email: "temp123@mailpro.com", from: "John Smith", subject: "Welcome to TempMailPro", time: "2 min ago", body: "Thanks for using TempMailPro! Your temporary email is ready to use." },
  { email: "temp123@mailpro.com", from: "Alice Brown", subject: "Important update", time: "10 min ago", body: "Please review the latest updates." },
  { email: "temp456@mailpro.com", from: "Jane Doe", subject: "Check your inbox", time: "5 min ago", body: "Here’s your daily news update." }
];

export default function Inbox() {
  const navigate = useNavigate();
  const [selectedEmail, setSelectedEmail] = useState(emailAccounts[0].email);
  const filteredEmails = emails.filter(e => e.email === selectedEmail);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
            <p className="text-muted-foreground">Your temporary emails</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />Generate Email
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {emailAccounts.map((acc) => (
            <EmailCard key={acc.email} email={acc.email} expiresIn={acc.expiresIn} onCopy={() => setSelectedEmail(acc.email)} />
          ))}
        </div>

        <Card className="bg-card border-border shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />Live Inbox
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredEmails.map(email => (
                <div key={email.from+email.subject} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border cursor-pointer" onClick={() => navigate("/emailviewer", { state: { email } })}>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
      <Mail className="h-4 w-4 text-primary-foreground" />
    </div>
    <div>
      <p className="text-sm font-medium text-card-foreground">Email from: {email.from}</p>
      <p className="text-xs text-muted-foreground">{email.subject}</p>
      <Badge variant="secondary" className="text-xs mt-1">{email.time}</Badge>
    </div>
  </div>
  <div className="flex items-center gap-2">
    <Button variant="outline" size="sm" className="border-border" onClick={e => e.stopPropagation()}><Forward className="h-3 w-3 mr-1" />Forward</Button>
    <Button variant="outline" size="sm" className="border-border" onClick={e => e.stopPropagation()}><Sparkles className="h-3 w-3 mr-1" />AI Summary</Button>
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
