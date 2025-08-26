import {
  Users,
  GraduationCap,
  Shield,
  Brain,
  TrendingUp,
  MessageSquare,
  BookOpen,
  BarChart3,
  Clock,
  Calendar,
  FileText,
  CreditCard,
  Smartphone,
  Globe,
  Database,
  Settings,
  Bell,
} from "lucide-react"

// Data for UserTypesSection
export const userTypes = [
  {
    title: "School Administrators",
    description: "Complete oversight and management tools for efficient school operations",
    icon: Shield,
    color: "bg-blue-500",
    features: [
      "Student Information System (SIS)",
      "Staff Management & Payroll",
      "Financial Management & Budgeting",
      "Compliance & Reporting Tools",
      "Multi-campus Management",
      "AI-powered Analytics Dashboard",
      "Automated Scheduling System",
      "Resource Allocation Optimizer",
    ],
  },
  {
    title: "Teachers & Educators",
    description: "AI-enhanced teaching tools and classroom management solutions",
    icon: GraduationCap,
    color: "bg-green-500",
    features: [
      "AI Lesson Plan Generator",
      "Smart Grading Assistant",
      "Interactive Digital Classroom",
      "Student Progress Tracking",
      "Parent Communication Portal",
      "Curriculum Management",
      "Assessment Builder",
      "Behavioral Analytics",
    ],
  },
  {
    title: "Parents & Students",
    description: "Stay connected and engaged with personalized learning experiences",
    icon: Users,
    color: "bg-purple-500",
    features: [
      "Real-time Progress Monitoring",
      "AI Tutoring Assistant",
      "Homework & Assignment Tracker",
      "Parent-Teacher Communication",
      "Attendance & Schedule Access",
      "Personalized Learning Paths",
      "Achievement Badges & Rewards",
      "Mobile App Access",
    ],
  },
]

// Data for AIFeaturesSection
export const aiFeatures = [
  {
    icon: Brain,
    title: "AI Teaching Assistant",
    description: "Intelligent tutoring system that adapts to each student's learning style and pace",
    benefits: ["Personalized learning paths", "24/7 student support", "Adaptive assessments"],
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Advanced analytics to predict student performance and identify at-risk students",
    benefits: ["Early intervention alerts", "Performance forecasting", "Data-driven insights"],
  },
  {
    icon: MessageSquare,
    title: "Smart Communication",
    description: "AI-powered communication tools for seamless interaction between all stakeholders",
    benefits: ["Auto-translation", "Sentiment analysis", "Smart notifications"],
  },
  {
    icon: BookOpen,
    title: "Curriculum Optimizer",
    description: "AI-driven curriculum planning and optimization based on learning outcomes",
    benefits: ["Standards alignment", "Learning gap analysis", "Content recommendations"],
  },
  {
    icon: TrendingUp,
    title: "Performance Insights",
    description: "Real-time performance tracking with AI-generated insights and recommendations",
    benefits: ["Individual progress tracking", "Class performance analysis", "Improvement suggestions"],
  },
  {
    icon: Clock,
    title: "Automated Scheduling",
    description: "Intelligent scheduling system that optimizes timetables and resource allocation",
    benefits: ["Conflict resolution", "Resource optimization", "Preference matching"],
  },
]

export const aiPlatformStats = [
  { value: "95%", label: "Student Engagement Increase", valueClassName: "text-blue-600" },
  { value: "40%", label: "Faster Learning Progress", valueClassName: "text-green-600" },
  { value: "85%", label: "Teacher Time Saved", valueClassName: "text-purple-600" },
]

// Data for FeaturesGrid
export const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-powered timetable management with conflict resolution and optimization",
  },
  {
    icon: FileText,
    title: "Digital Records",
    description: "Comprehensive student information system with secure document management",
  },
  {
    icon: CreditCard,
    title: "Fee Management",
    description: "Automated billing, payment processing, and financial reporting tools",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Enterprise-grade security with FERPA compliance and data protection",
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description: "Native mobile apps for iOS and Android with offline capabilities",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Support for 50+ languages with real-time translation features",
  },
  {
    icon: Database,
    title: "Data Analytics",
    description: "Advanced reporting and analytics with customizable dashboards",
  },
  {
    icon: Settings,
    title: "Customization",
    description: "Flexible configuration options to match your school's unique needs",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Intelligent alert system with personalized notification preferences",
  },
  {
    icon: Users,
    title: "Community Portal",
    description: "Integrated social features to build stronger school communities",
  },
  {
    icon: BookOpen,
    title: "Library Management",
    description: "Digital library system with inventory tracking and e-book integration",
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Real-time academic performance monitoring with predictive insights",
  },
]

// Data for TestimonialsSection
export const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Principal",
    school: "Riverside Elementary School",
    content:
      "FlexDesk has revolutionized how we manage our school. The AI-powered insights have helped us identify struggling students early and provide targeted support. Our parent engagement has increased by 60%.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael Chen",
    role: "Mathematics Teacher",
    school: "Lincoln High School",
    content:
      "The AI teaching assistant has been a game-changer for my classroom. It helps me create personalized learning paths for each student and saves me hours of grading time every week.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Jennifer Martinez",
    role: "Parent",
    school: "Oakwood Middle School",
    content:
      "I love being able to track my daughter's progress in real-time. The communication with teachers is seamless, and the AI tutoring feature has really helped her with homework.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "David Thompson",
    role: "IT Administrator",
    school: "Metro School District",
    content:
      "Implementing FlexDesk across our 15 schools was smooth and efficient. The security features give us peace of mind, and the analytics help us make data-driven decisions district-wide.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    school: "Central High School",
    content:
      "The AI tutor is like having a personal teacher available 24/7. It explains things in different ways until I understand, and the mobile app makes it easy to stay organized.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Robert Kim",
    role: "Superintendent",
    school: "Valley School District",
    content:
      "FlexDesk has improved efficiency across all our schools. The predictive analytics help us allocate resources better, and the automated reporting saves our staff countless hours.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export const companyStats = [
  { value: "4.9/5", label: "Average Rating", labelClassName: "opacity-90" },
  { value: "99.9%", label: "Uptime", labelClassName: "opacity-90" },
  { value: "24/7", label: "Support", labelClassName: "opacity-90" },
  { value: "50+", label: "Countries", labelClassName: "opacity-90" },
]

// Data for PricingSection
export const plans = [
  {
    name: "Starter",
    description: "Perfect for small schools getting started",
    price: "$29",
    period: "per month",
    studentLimit: "Up to 200 students",
    popular: false,
    features: [
      "Student Information System",
      "Basic Parent Portal",
      "Grade Management",
      "Attendance Tracking",
      "Basic Reporting",
      "Email Support",
      "Mobile App Access",
      "Cloud Storage (10GB)",
    ],
  },
  {
    name: "Professional",
    description: "Advanced features for growing schools",
    price: "$79",
    period: "per month",
    studentLimit: "Up to 1,000 students",
    popular: true,
    features: [
      "Everything in Starter",
      "AI Teaching Assistant",
      "Advanced Analytics",
      "Custom Reporting",
      "Fee Management",
      "Library Management",
      "Priority Support",
      "Cloud Storage (100GB)",
      "API Access",
      "Multi-campus Support",
    ],
  },
  {
    name: "Enterprise",
    description: "Complete solution for large institutions",
    price: "Custom",
    period: "pricing",
    studentLimit: "Unlimited students",
    popular: false,
    features: [
      "Everything in Professional",
      "Advanced AI Features",
      "Predictive Analytics",
      "Custom Integrations",
      "Dedicated Account Manager",
      "24/7 Phone Support",
      "Unlimited Cloud Storage",
      "White-label Options",
      "Advanced Security",
      "Custom Training",
    ],
  },
]

// Data for HeroSection
export const heroStats = [
  { value: "10,000+", label: "Schools Trust Us" },
  { value: "500K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
]
