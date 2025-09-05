"use client"

import type React from "react"

import { useAuth } from "@/lib/contexts/AuthContext"
import { ProtectedRoute } from "@/components/auth/protected-route"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Settings,
  Shield,
  BarChart3,
  Bell,
  Search,
  LogOut,
  User,
  School,
  Building,
  ClipboardList,
  UserCheck,
  Bus,
  Bed,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const navigationItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/super-admin/dashboard", icon: Home },
      { title: "Analytics", url: "/super-admin/analytics", icon: BarChart3 },
      { title: "Tasks", url: "/super-admin/tasks", icon: ClipboardList },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Schools", url: "/super-admin/schools", icon: School },
      { title: "Administrators", url: "/super-admin/administrators", icon: Shield },
      { title: "Teachers", url: "/super-admin/teachers", icon: GraduationCap },
      { title: "Students", url: "/super-admin/students", icon: Users },
    ],
  },
  {
    title: "Operations",
    items: [
      { title: "Classes", url: "/super-admin/classes", icon: Building },
      { title: "Subjects", url: "/super-admin/subjects", icon: BookOpen },
      { title: "Schedule", url: "/super-admin/schedule", icon: Calendar },
      { title: "Attendance", url: "/super-admin/attendance", icon: UserCheck },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Library", url: "/super-admin/library", icon: BookOpen },
      { title: "Transport", url: "/super-admin/transport", icon: Bus },
      { title: "Hostel", url: "/super-admin/hostel", icon: Bed },
      { title: "Notices", url: "/super-admin/notices", icon: FileText },
    ],
  },
]

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuth()
  const searchParams = useSearchParams()

  return (
    <ProtectedRoute requiredRole="proprietor">
      <SidebarProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex min-h-screen w-full">
            <Sidebar variant="inset">
              <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                  <Image src="/images/logo-flexdesk.png" alt="FlexDesk" width={32} height={32} className="h-8 w-8" />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-primary">FlexDesk</span>
                    <span className="text-xs text-muted-foreground">SuperAdmin</span>
                  </div>
                </div>
              </SidebarHeader>
              <SidebarContent>
                {navigationItems.map((group) => (
                  <SidebarGroup key={group.title}>
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <Link href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>
              <SidebarFooter>
                <div className="p-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.profile?.profilePicture || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user?.firstName?.[0]}
                            {user?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">
                            {user?.firstName} {user?.lastName}
                          </span>
                          <span className="text-xs text-muted-foreground">Super Admin</span>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              {/* Header */}
              <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="flex flex-1 items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="What do you want to find?" className="pl-9 bg-muted/50" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.profile?.profilePicture || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user?.firstName?.[0]}
                              {user?.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="hidden md:flex flex-col items-start">
                            <span className="text-sm font-medium">
                              {user?.firstName} {user?.lastName}
                            </span>
                            <span className="text-xs text-muted-foreground">Super Admin</span>
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </header>
              <main className="flex-1 overflow-auto">{children}</main>
            </SidebarInset>
          </div>
        </Suspense>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
