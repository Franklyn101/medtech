"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, FileText, BarChart3, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"
import { useFirebase } from "@/lib/firebase/firebase-provider"

// Mock data for dashboard
const mockStats = {
  visitors: 12543,
  events: 3,
  pages: 7,
  teamMembers: 8,
}

const mockActivity = [
  {
    id: "1",
    type: "page",
    title: "Homepage content updated",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    user: "Admin",
  },
  {
    id: "2",
    type: "event",
    title: "New event added: Bayelsa Ed Tech Festival",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    user: "Admin",
  },
  {
    id: "3",
    type: "team",
    title: "Team member profile updated",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    user: "Admin",
  },
]

export default function AdminDashboard() {
  const { user } = useFirebase()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/">View Website</Link>
        </Button>
      </div>

      {user && (
        <div className="bg-teal-50 border border-teal-200 rounded-md p-4 text-teal-800">
          <p className="font-medium">Welcome, {user.displayName || user.email}</p>
          <p className="text-sm mt-1">You are logged in as an administrator</p>
        </div>
      )}

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.visitors.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.events}</div>
                <p className="text-xs text-muted-foreground">Next event in 12 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pages</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.pages}</div>
                <p className="text-xs text-muted-foreground">Across the website</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.teamMembers}</div>
                <p className="text-xs text-muted-foreground">Active profiles</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes to the website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center">
                      <div className="mr-4 rounded-full bg-teal-100 p-2">
                        {activity.type === "page" && <FileText className="h-4 w-4 text-teal-600" />}
                        {activity.type === "event" && <Calendar className="h-4 w-4 text-teal-600" />}
                        {activity.type === "team" && <Users className="h-4 w-4 text-teal-600" />}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp.toLocaleString()} by {activity.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Website Traffic</CardTitle>
                <CardDescription>Visitor statistics for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart3 className="h-16 w-16 text-gray-400" />
                  <span className="ml-2 text-gray-500">Traffic chart visualization</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium">Page Views</p>
                    <p className="text-2xl font-bold">45.2k</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Bounce Rate</p>
                    <p className="text-2xl font-bold">42%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Avg. Time</p>
                    <p className="text-2xl font-bold">3:12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>Detailed website performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                <TrendingUp className="h-16 w-16 text-gray-400" />
                <span className="ml-2 text-gray-500">Analytics dashboard visualization</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage website content, images, and pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
                    <Link href="/admin/content/pages">
                      <FileText className="h-10 w-10 mb-2" />
                      <span>Pages</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
                    <Link href="/admin/content/events">
                      <Calendar className="h-10 w-10 mb-2" />
                      <span>Events</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center justify-center">
                    <Link href="/admin/content/team">
                      <Users className="h-10 w-10 mb-2" />
                      <span>Team</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
              <CardDescription>Manage website configuration and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/settings/general">General Settings</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/settings/appearance">Appearance</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/settings/users">User Management</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
