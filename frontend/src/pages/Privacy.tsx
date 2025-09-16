import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" /> Privacy Settings
        </h1>
        <Card className="bg-card border-border shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              Email Privacy Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Data Sharing</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Public Inbox Access</span>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
