"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts"
import {
  Users,
  DollarSign,
  TrendingUp,
  Filter,
  BookOpen,
  UserCheck,
  Plus,
  CheckCircle,
  Circle,
  AlertCircle,
  Target,
  TrendingDown,
  Eye,
  MoreHorizontal,
} from "lucide-react"

const overviewStats = [
  {
    value: "15.00K",
    label: "Students",
    valueClassName: "text-3xl font-bold text-purple-600",
    icon: Users,
    change: "+12%",
    changeType: "positive",
  },
  {
    value: "2.00K",
    label: "Teachers",
    valueClassName: "text-3xl font-bold text-blue-600",
    icon: UserCheck,
    change: "+8%",
    changeType: "positive",
  },
  {
    value: "5.6K",
    label: "Parents",
    valueClassName: "text-3xl font-bold text-orange-600",
    icon: Users,
    change: "+15%",
    changeType: "positive",
  },
  {
    value: "$19.3K",
    label: "Earnings",
    valueClassName: "text-3xl font-bold text-green-600",
    icon: DollarSign,
    change: "-3%",
    changeType: "negative",
  },
]

const examResultsData = [
  { day: "Mon", teacher: 65000, students: 45000 },
  { day: "Tue", teacher: 70000, students: 52000 },
  { day: "Wed", teacher: 55000, students: 48000 },
  { day: "Thu", teacher: 80000, students: 61000 },
  { day: "Fri", teacher: 75000, students: 55000 },
  { day: "Sat", teacher: 85000, students: 67000 },
  { day: "Sun", teacher: 60000, students: 43000 },
]

const studentDemographics = [
  { name: "Male", value: 60, color: "#8B5CF6" },
  { name: "Female", value: 40, color: "#F59E0B" },
]

const starStudents = [
  {
    name: "Evelyn Harper",
    id: "PRE43178",
    marks: 1185,
    percent: 98,
    year: 2014,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Diana Plenty",
    id: "PRE43174",
    marks: 1165,
    percent: 91,
    year: 2014,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "John Millar",
    id: "PRE43187",
    marks: 1175,
    percent: 92,
    year: 2014,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Miles Esther",
    id: "PRE45371",
    marks: 1180,
    percent: 93,
    year: 2014,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const recentActivities = [
  {
    title: "New Teacher",
    description: "It is a long established readable.",
    time: "Just now",
    type: "user",
    icon: UserCheck,
  },
  {
    title: "Fees Structure",
    description: "It is a long established readable.",
    time: "Today",
    type: "finance",
    icon: DollarSign,
  },
  {
    title: "New Course",
    description: "It is a long established readable.",
    time: "24 Sep 2023",
    type: "course",
    icon: BookOpen,
  },
]

const tasks = [
  {
    id: 1,
    title: "Prepare attendance report",
    assignee: "Dr. Sarah Johnson",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Draft fee reminder emails",
    assignee: "Mike Chen",
    status: "completed",
    priority: "medium",
    dueDate: "2024-01-12",
  },
  {
    id: 3,
    title: "Review teacher applications",
    assignee: "Lisa Rodriguez",
    status: "pending",
    priority: "high",
    dueDate: "2024-01-18",
  },
  {
    id: 4,
    title: "Update school policies",
    assignee: "System",
    status: "pending",
    priority: "low",
    dueDate: "2024-01-20",
  },
]

export default function SuperAdminDashboard() {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({ title: "", description: "", assignee: "", priority: "medium", dueDate: "" })

  const handleCreateTask = () => {
    // Task creation logic would go here
    console.log("Creating task:", newTask)
    setIsTaskDialogOpen(false)
    setNewTask({ title: "", description: "", assignee: "", priority: "medium", dueDate: "" })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Circle className="h-4 w-4 text-blue-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your schools today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>Create and delegate a new task to team members.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Task Title</label>
                  <Input
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Enter task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assignee</label>
                    <Select
                      value={newTask.assignee}
                      onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-sarah">Dr. Sarah Johnson</SelectItem>
                        <SelectItem value="mike-chen">Mike Chen</SelectItem>
                        <SelectItem value="lisa-rodriguez">Lisa Rodriguez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask}>Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Monthly
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className={stat.valueClassName}>{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.changeType === "positive" ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <stat.icon className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exam Results Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Exam Results</CardTitle>
                <CardDescription>Weekly performance overview</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  Teacher
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  Students
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                teacher: { label: "Teacher", color: "#8B5CF6" },
                students: { label: "Students", color: "#3B82F6" },
              }}
              className="h-[300px]"
            >
              <LineChart data={examResultsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="teacher" stroke="var(--color-teacher)" strokeWidth={3} />
                <Line type="monotone" dataKey="students" stroke="var(--color-students)" strokeWidth={3} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Student Demographics */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Students</CardTitle>
                <CardDescription>Gender distribution</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <ChartContainer
                  config={{
                    demographics: { label: "Students" },
                  }}
                  className="h-[200px] w-[200px]"
                >
                  <PieChart>
                    <Pie
                      data={studentDemographics}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {studentDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">15000</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {studentDemographics.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Management */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Task Management
                </CardTitle>
                <CardDescription>Track and delegate tasks across your organization</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">Assigned to {task.assignee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Exam Results</CardTitle>
                <CardDescription>Recent system activities</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <activity.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Star Students Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Star Students</CardTitle>
              <CardDescription>Top performing students across all schools</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Marks</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Percent</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Year</th>
                </tr>
              </thead>
              <tbody>
                {starStudents.map((student, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                        <img
                          src={student.avatar || "/placeholder.svg"}
                          alt={student.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium text-sm">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{student.id}</td>
                    <td className="py-3 px-4 text-sm">{student.marks}</td>
                    <td className="py-3 px-4 text-sm">{student.percent}%</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{student.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
