"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { StatsGrid } from "@/components/shared/stats-grid"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts"
import {
  School,
  Users,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Brain,
  Shield,
  Calendar,
  FileText,
  Settings,
  Download,
  Filter,
  Bell,
  Activity,
  MapPin,
  BookOpen,
  UserCheck,
  Clock,
} from "lucide-react"

// Mock data for demonstration
const overviewStats = [
  { value: "247", label: "Total Schools", valueClassName: "text-3xl font-bold text-blue-600" },
  { value: "12,847", label: "Total Teachers", valueClassName: "text-3xl font-bold text-green-600" },
  { value: "156,293", label: "Total Students", valueClassName: "text-3xl font-bold text-purple-600" },
  { value: "$2.4M", label: "Monthly Revenue", valueClassName: "text-3xl font-bold text-orange-600" },
]

const revenueData = [
  { school: "Lincoln High", revenue: 45000, expenses: 38000, profit: 7000 },
  { school: "Roosevelt Elementary", revenue: 32000, expenses: 28000, profit: 4000 },
  { school: "Washington Middle", revenue: 38000, expenses: 35000, profit: 3000 },
  { school: "Jefferson Academy", revenue: 52000, expenses: 41000, profit: 11000 },
  { school: "Madison Prep", revenue: 41000, expenses: 39000, profit: 2000 },
]

const enrollmentTrends = [
  { month: "Jan", students: 145000, predicted: 148000 },
  { month: "Feb", students: 147000, predicted: 150000 },
  { month: "Mar", students: 149000, predicted: 152000 },
  { month: "Apr", students: 151000, predicted: 154000 },
  { month: "May", students: 153000, predicted: 156000 },
  { month: "Jun", students: 156000, predicted: 158000 },
]

const schoolPerformance = [
  { name: "Excellent", value: 45, color: "#10B981" },
  { name: "Good", value: 32, color: "#3B82F6" },
  { name: "Average", value: 18, color: "#F59E0B" },
  { name: "Needs Improvement", value: 5, color: "#EF4444" },
]

const aiInsights = [
  {
    title: "Dropout Risk Alert",
    description: "23 students across 5 schools identified as high-risk",
    severity: "high",
    action: "Review Cases",
  },
  {
    title: "Staff Reallocation Suggestion",
    description: "Move 3 teachers from Lincoln High to Roosevelt Elementary",
    severity: "medium",
    action: "View Details",
  },
  {
    title: "Enrollment Prediction",
    description: "Expected 8% increase in fall enrollment",
    severity: "low",
    action: "Plan Resources",
  },
]

const recentActivities = [
  { user: "Dr. Sarah Johnson", action: "Updated school policy", time: "2 hours ago", type: "policy" },
  { user: "Mike Chen", action: "Submitted monthly report", time: "4 hours ago", type: "report" },
  { user: "Lisa Rodriguez", action: "Added new teacher", time: "6 hours ago", type: "user" },
  { user: "System", action: "Automated backup completed", time: "8 hours ago", type: "system" },
]

export default function SuperAdminDashboard() {
  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SuperAdmin Dashboard</h1>
              <p className="text-gray-600">Comprehensive overview of all school operations</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Top-Level Overview */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Real-Time Overview</h2>
            <StatsGrid stats={overviewStats} gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" />
          </section>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Expense */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Revenue vs Expenses by School
                </CardTitle>
                <CardDescription>Monthly financial performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: { label: "Revenue", color: "#3B82F6" },
                    expenses: { label: "Expenses", color: "#EF4444" },
                    profit: { label: "Profit", color: "#10B981" },
                  }}
                  className="h-[300px]"
                >
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="school" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" />
                    <Bar dataKey="expenses" fill="var(--color-expenses)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Enrollment Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Student Enrollment Trends
                </CardTitle>
                <CardDescription>Actual vs predicted enrollment</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    students: { label: "Actual", color: "#8B5CF6" },
                    predicted: { label: "Predicted", color: "#06B6D4" },
                  }}
                  className="h-[300px]"
                >
                  <AreaChart data={enrollmentTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stroke="var(--color-students)"
                      fill="var(--color-students)"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="predicted"
                      stroke="var(--color-predicted)"
                      fill="var(--color-predicted)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights and School Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Insights */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>Automated analysis and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{insight.title}</h4>
                          <Badge
                            variant={
                              insight.severity === "high"
                                ? "destructive"
                                : insight.severity === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {insight.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {insight.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* School Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5 text-orange-600" />
                  School Performance
                </CardTitle>
                <CardDescription>Overall performance distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    performance: { label: "Schools" },
                  }}
                  className="h-[200px]"
                >
                  <PieChart>
                    <Pie data={schoolPerformance} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                      {schoolPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {schoolPerformance.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operations and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Operations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-600" />
                  Quick Operations
                </CardTitle>
                <CardDescription>Frequently used management tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Role Editor</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">Documents</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Audit Schedule</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Shield className="h-6 w-6" />
                    <span className="text-sm">Security Logs</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest system and user activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.type === "policy" && <FileText className="h-4 w-4 text-blue-600" />}
                        {activity.type === "report" && <BookOpen className="h-4 w-4 text-green-600" />}
                        {activity.type === "user" && <UserCheck className="h-4 w-4 text-purple-600" />}
                        {activity.type === "system" && <Settings className="h-4 w-4 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <p className="text-xs text-gray-600">{activity.action}</p>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts and Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                System Alerts & Notifications
              </CardTitle>
              <CardDescription>Critical issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-900">Critical</span>
                  </div>
                  <p className="text-sm text-red-800">2 schools have compliance violations</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Warning</span>
                  </div>
                  <p className="text-sm text-yellow-800">5 teachers pending certification renewal</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Info</span>
                  </div>
                  <p className="text-sm text-blue-800">New school registration pending approval</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
