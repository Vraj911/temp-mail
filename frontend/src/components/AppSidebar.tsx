import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Inbox,
  Code,
  BarChart3,
  Settings,
  Mail,
  User,
  LogOut,
  Menu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Generate Email", url: "/generate", icon: Mail },
  { title: "API", url: "/api", icon: Code },
  { title: "Stats", url: "/stats", icon: BarChart3 },
  { title: "User Settings", url: "/settings", icon: Settings },
  { title: "Email Viewer", url: "/viewer", icon: Mail },
];
const supportItems = [
  { title: "Customization", url: "/customization", icon: Settings },
  { title: "Privacy", url: "/privacy", icon: Settings },
  { title: "Security", url: "/security", icon: Settings },
  { title: "Configurations", url: "/configurations", icon: Settings },
];
export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  return (
    <Sidebar className={cn("transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-sidebar-foreground">TempMailPro</span>
          </div>
        )}
        <SidebarTrigger className="ml-auto" />
      </div>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {!collapsed && (
          <SidebarGroup className="mt-6">
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Support
              </h3>
            </div>
            <SidebarGroupContent>
              <SidebarMenu>
                {supportItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                          isActive(item.url)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">Alex Smith</p>
              <p className="text-xs text-muted-foreground">alexsmith@email.com</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="flex items-center gap-2 mt-3">
            <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-sidebar-foreground transition-colors">
              <Settings className="h-3 w-3" />
              Settings
            </button>
            <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-sidebar-foreground transition-colors ml-auto">
              <LogOut className="h-3 w-3" />
              Log out
            </button>
          </div>
        )}
      </div>
    </Sidebar>
  );
}