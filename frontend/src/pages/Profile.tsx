import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Save, X } from "lucide-react";
export default function Profile() {
  const [fullName, setFullName] = useState("Alex Smith");
  const [email, setEmail] = useState("alexsmith@email.com");
  const [profileImage, setProfileImage] = useState("");
  const handleSave = () => {
    console.log("Saving profile...");
  };
  const handleDiscard = () => {
    setFullName("Alex Smith");
    setEmail("alexsmith@email.com");
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">User Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>
        <Card className="bg-card border-border shadow-custom-lg">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">Profile picture</Label>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileImage} alt="Profile" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    AS
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="border-border">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Formats: jpg, gif, png. Max: 500k.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">User Information</h3>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm text-card-foreground">
                  Full name*
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-card-foreground">
                  Email address
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="flex-1 bg-input border-border text-foreground"
                    disabled
                  />
                  <Button variant="outline" className="border-border">
                    Update email
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleDiscard}
                variant="outline"
                className="border-border"
              >
                <X className="h-4 w-4 mr-2" />
                Discard
              </Button>
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                <Save className="h-4 w-4 mr-2" />
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}