import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmailCard } from "@/components/EmailCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Forward, Sparkles, Plus } from "lucide-react";
import { fetchEmails, Email } from "@/api/emails"; 
export default function Inbox() {
  const navigate = useNavigate();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  useEffect(() => {
    const getEmails = async () => {
      try {
        const data = await fetchEmails();
        setEmails(data);
        if (data.length > 0) setSelectedEmail(data[0].address);
      } catch (err) {
        console.error("Error fetching emails:", err);
      } finally {
        setLoading(false);
      }
    };
    getEmails();
  }, []);
  const filteredEmails = emails.filter(e => e.address === selectedEmail);
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
            <p className="text-muted-foreground">Your temporary emails</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground" onClick={() => navigate("/generate")}>
            <Plus className="h-4 w-4 mr-2" />Generate Email
          </Button>
        </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <p className="text-muted-foreground col-span-full text-center">Loading emails...</p>
          ) : emails.length > 0 ? (
            emails.map(acc => (
              <EmailCard
                key={acc.address}
                email={acc.address}
                expiresIn={
                  acc.expires_at
                    ? Math.ceil((new Date(acc.expires_at).getTime() - Date.now()) / (1000 * 60))
                    : 0
                }
                onCopy={() => setSelectedEmail(acc.address)}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full text-center">No emails yet</p>
          )}
        </div>
        <Card className="bg-card border-border shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />Live Inbox
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredEmails.length === 0 ? (
                <p className="text-muted-foreground text-center">No emails for this account</p>
              ) : (
                filteredEmails.map(email => (
                  <div
                    key={email._id || email.address} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border cursor-pointer"
                    onClick={() => navigate("/emailviewer", { state: { email } })}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Mail className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">Email from: {email.from || "Unknown Sender"}</p>
                        <p className="text-xs text-muted-foreground">{email.subject || "No Subject"}</p>
                        <Badge variant="secondary" className="text-xs mt-1">{email.time || "Just now"}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border"
                        onClick={e => e.stopPropagation()}
                      >
                        <Forward className="h-3 w-3 mr-1" />Forward
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border"
                        onClick={e => e.stopPropagation()}
                      >
                        <Sparkles className="h-3 w-3 mr-1" />AI Summary
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
