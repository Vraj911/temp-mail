import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";

export default function Configurations() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" /> Configurations
        </h1>
        <Card className="bg-card border-border shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">API Base URL</label>
              <Input placeholder="https://api.tempmailpro.com" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Max Active Emails</label>
              <Input type="number" placeholder="100" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
