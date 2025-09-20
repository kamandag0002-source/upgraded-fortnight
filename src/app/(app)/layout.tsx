"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { AppProvider } from "@/context/app-context";
import {
  Bell,
  ClipboardPen,
  LayoutGrid,
  LineChart,
  Sparkles,
  Wind,
  HeartPulse,
} from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/check-in", label: "Daily Check-in", icon: ClipboardPen },
    { href: "/affirmations", label: "Affirmations", icon: Sparkles },
    { href: "/reminders", label: "Reminders", icon: Bell },
    { href: "/relaxation", label: "Relaxation", icon: Wind },
    { href: "/mood-tracking", label: "Mood Tracking", icon: LineChart },
  ];

  return (
    <AppProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <HeartPulse className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-headline">Mindful Moments</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: "right" }}
                  >
                    <Link href={item.href}>
                      <item.icon className={pathname === item.href ? "text-accent" : ""} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </AppProvider>
  );
}
