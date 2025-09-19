import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Crown, 
  Shield, 
  Trash2,
  Settings as SettingsIcon 
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const teamMembers = [
  { name: "Alice Johnson", role: "Admin", status: "Active" },
  { name: "Bob Smith", role: "Member", status: "Inactive" },
  { name: "Charlie Brown", role: "Member", status: "Active" },
];

export default function Settings() {
  const [emails, setEmails] = useState<any[]>([]);
   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/emails?user_id=64f9e6a1f8a4b2c3d4e5f678");
        setEmails(res.data);
      } catch (error) {
        console.error("Failed to fetch emails:", error);
      }
    };
    fetchEmails();
  }, []);

  const handleDeleteEmail = async (emailId: string) => {
    try {
      await axios.get(`${BACKEND_URL}/api/settings/delete?id=${emailId}`);
      setEmails(prev => prev.filter(e => e._id !== emailId));
    } catch (error) {
      console.error("Failed to delete email:", error);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account and team settings</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border shadow-custom-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg text-card-foreground">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-card-foreground">Email Address</p>
                  <p className="text-sm text-muted-foreground">user@example.com</p>
                  <Badge variant="outline" className="mt-1">
                    Verified
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-custom-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg text-card-foreground">Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-muted text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                    {member.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-3 border-border">
                Add temporary user
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border shadow-custom-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Crown className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg text-card-foreground">Free Tier</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create 10 temporary emails daily. Need More?
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">100 active</span>
                <span className="text-sm text-muted-foreground">5 pending</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                Upgrade
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-custom-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg text-card-foreground">Privacy Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Control your email visibility settings.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-sm">
                    Email notifications
                  </Label>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-sharing" className="text-sm">
                    Data sharing
                  </Label>
                  <Switch id="data-sharing" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="bg-card border-destructive shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg text-destructive flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage your temporary emails effectively. Not needed anymore?
            </p>
            <div className="space-y-2">
              {emails.length === 0 ? (
                <p className="text-sm text-muted-foreground">No emails to delete.</p>
              ) : (
                emails.map(email => (
                  <div key={email._id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <span className="text-sm text-card-foreground">{email.address}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteEmail(email._id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
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
