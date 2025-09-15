import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  Mail,
  Clock,
  Users,
  Shield,
  Activity,
  Calendar,
  Target,
  Zap
} from "lucide-react";
const statsData = {
  overview: {
    totalEmails: 2847,
    activeEmails: 23,
    totalReceived: 156,
    avgDuration: "8.5 min"
  },
  weekly: [
    { day: "Mon", emails: 45, received: 12 },
    { day: "Tue", emails: 38, received: 8 },
    { day: "Wed", emails: 52, received: 15 },
    { day: "Thu", emails: 41, received: 9 },
    { day: "Fri", emails: 29, received: 6 },
    { day: "Sat", emails: 18, received: 4 },
    { day: "Sun", emails: 22, received: 5 }
  ],
  domains: [
    { name: "@mailpro.com", count: 1245, percentage: 85 },
    { name: "@tempbox.io", count: 187, percentage: 12 },
    { name: "@quickmail.net", count: 45, percentage: 3 }
  ]
};
const ActivityItem = ({ icon: Icon, label, value, trend, color = "text-muted-foreground" }: {
  icon: any;
  label: string;
  value: string;
  trend?: string;
  color?: string;
}) => (
  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-primary/10`}>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-card-foreground">{label}</p>
        {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
      </div>
    </div>
    <span className={`text-sm font-semibold ${color}`}>{value}</span>
  </div>
);
export default function Stats() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Statistics & Analytics</h1>
          <p className="text-muted-foreground">Track your temporary email usage and performance metrics</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border shadow-custom-md hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{statsData.overview.totalEmails.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Emails Created</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-custom-md hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{statsData.overview.activeEmails}</p>
                  <p className="text-sm text-muted-foreground">Currently Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-custom-md hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{statsData.overview.totalReceived}</p>
                  <p className="text-sm text-muted-foreground">Messages Received</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border shadow-custom-md hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{statsData.overview.avgDuration}</p>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Recent Activity
            </TabsTrigger>
            <TabsTrigger value="domains" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Domain Usage
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border shadow-custom-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {statsData.weekly.map((day, index) => (
                      <div key={index} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{day.day}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-card-foreground">{day.emails} emails</span>
                            <span className="text-primary">{day.received} received</span>
                          </div>
                        </div>
                        <Progress value={(day.emails / 60) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-custom-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Email Generation Speed</span>
                      <Badge variant="secondary">Excellent</Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Delivery Success Rate</span>
                      <Badge variant="default">99.2%</Badge>
                    </div>
                    <Progress value={99} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Privacy Protection</span>
                      <Badge variant="default">100%</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Server Uptime</span>
                      <Badge variant="default">99.9%</Badge>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-card border-border shadow-custom-lg">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <ActivityItem
                    icon={Mail}
                    label="New email generated"
                    value="2 min ago"
                    trend="temp456@mailpro.com"
                  />
                  <ActivityItem
                    icon={TrendingUp}
                    label="Message received"
                    value="5 min ago"
                    trend="From: notification@service.com"
                  />
                  <ActivityItem
                    icon={Clock}
                    label="Email expired"
                    value="8 min ago"
                    trend="temp123@mailpro.com"
                  />
                  <ActivityItem
                    icon={Shield}
                    label="Privacy scan completed"
                    value="15 min ago"
                    trend="All emails secured"
                    color="text-green-600"
                  />
                  <ActivityItem
                    icon={Zap}
                    label="Quick generate used"
                    value="23 min ago"
                    trend="Default settings applied"
                  />
                  <ActivityItem
                    icon={Users}
                    label="API request made"
                    value="35 min ago"
                    trend="Generate endpoint"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="domains" className="space-y-6">
            <Card className="bg-card border-border shadow-custom-lg">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Domain Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statsData.domains.map((domain, index) => (
                    <div key={index} className="space-y-2 animate-fade-in hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono text-primary">{domain.name}</code>
                          <Badge variant="outline">{domain.count.toLocaleString()} emails</Badge>
                        </div>
                        <span className="text-sm font-semibold text-card-foreground">{domain.percentage}%</span>
                      </div>
                      <Progress value={domain.percentage} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card border-border shadow-custom-md hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-lg inline-block mb-3">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-card-foreground mb-1">3</p>
                  <p className="text-sm text-muted-foreground">Active Domains</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-custom-md hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-lg inline-block mb-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-card-foreground mb-1">85%</p>
                  <p className="text-sm text-muted-foreground">Primary Domain Usage</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-custom-md hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-lg inline-block mb-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-card-foreground mb-1">+12%</p>
                  <p className="text-sm text-muted-foreground">Growth This Month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}