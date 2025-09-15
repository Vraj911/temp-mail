import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Code,
  Copy,
  Eye,
  Key,
  RefreshCw,
  Download,
  Settings,
  Users,
  Activity,
  Check
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
const apiKeys = [
  {
    name: "Production Key",
    key: "tmp_prod_1234567890abcdef",
    status: "Active",
    lastUsed: "2 hours ago",
    requests: 1250
  },
  {
    name: "Development Key", 
    key: "tmp_dev_abcdef1234567890",
    status: "Active",
    lastUsed: "1 day ago",
    requests: 89
  }
];
const endpoints = [
  {
    method: "POST",
    path: "/api/v1/generate",
    description: "Generate a new temporary email",
    rateLimit: "100/hour"
  },
  {
    method: "GET",
    path: "/api/v1/inbox/{email}",
    description: "Get inbox messages for an email",
    rateLimit: "1000/hour"
  },
  {
    method: "DELETE",
    path: "/api/v1/email/{id}",
    description: "Delete a temporary email",
    rateLimit: "50/hour"
  }
];
export default function API() {
  const [copied, setCopied] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast({
        title: "Copied to clipboard",
        description: `${type} has been copied to your clipboard.`,
      });
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };
  const toggleKeyVisibility = (keyName: string) => {
    setShowKey(showKey === keyName ? null : keyName);
  };
  const maskKey = (key: string) => {
    return key.substring(0, 12) + "•".repeat(key.length - 16) + key.substring(key.length - 4);
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">API Management</h1>
          <p className="text-muted-foreground">Manage your API keys and integrate TempMailPro with your applications</p>
        </div>
        <Tabs defaultValue="keys" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="keys" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Documentation
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Usage Stats
            </TabsTrigger>
          </TabsList>
          <TabsContent value="keys" className="space-y-6">
            <Card className="bg-card border-border shadow-custom-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    Your API Keys
                  </CardTitle>
                  <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                    <Key className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiKeys.map((apiKey, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-muted/30 animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-card-foreground">{apiKey.name}</h3>
                        <p className="text-xs text-muted-foreground">Last used: {apiKey.lastUsed}</p>
                      </div>
                      <Badge variant={apiKey.status === "Active" ? "default" : "secondary"}>
                        {apiKey.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <code className="flex-1 p-2 bg-background rounded border text-sm font-mono">
                        {showKey === apiKey.name ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.name)}
                        className="border-border"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key, "API Key")}
                        className="border-border"
                        disabled={copied === "API Key"}
                      >
                        {copied === "API Key" ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{apiKey.requests} requests this month</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-border text-xs">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="border-destructive text-destructive text-xs">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="docs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border shadow-custom-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-card-foreground">API Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {endpoints.map((endpoint, index) => (
                        <div key={index} className="p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={endpoint.method === "GET" ? "default" : endpoint.method === "POST" ? "secondary" : "destructive"}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm font-mono text-primary">{endpoint.path}</code>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{endpoint.description}</p>
                          <p className="text-xs text-muted-foreground">Rate limit: {endpoint.rateLimit}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-custom-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-card-foreground">Code Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-card-foreground mb-2">JavaScript/Node.js</h4>
                      <div className="relative">
                        <pre className="p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                          <code>{`fetch('https://api.tempmailpro.com/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    duration: 600,
    prefix: 'mytemp'
  })
})`}</code>
                        </pre>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 border-border"
                          onClick={() => copyToClipboard(`fetch('https://api.tempmailpro.com/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    duration: 600,
    prefix: 'mytemp'
  })
})`, "Code")}
                        >
                          {copied === "Code" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-border">
                      <Download className="h-4 w-4 mr-2" />
                      Download Full Documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border shadow-custom-md hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">1,339</p>
                      <p className="text-sm text-muted-foreground">Total Requests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-custom-md hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">89%</p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-custom-md hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <RefreshCw className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">245ms</p>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-custom-md hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Key className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">2</p>
                      <p className="text-sm text-muted-foreground">Active Keys</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-card border-border shadow-custom-lg">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">Usage Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border border-border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">Usage chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}