import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Key } from "lucide-react";
export default function Security() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Lock className="h-6 w-6 text-primary" /> Security
        </h1>
        <Card className="bg-card border-border shadow-custom-md">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">Account Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-primary text-primary-foreground">
              <Key className="h-4 w-4 mr-2" /> Change Password
            </Button>
            <Button variant="outline" className="w-full border-border">
              Enable Two-Factor Authentication
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
