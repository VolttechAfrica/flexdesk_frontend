import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsGrid } from "@/components/shared/stats-grid"
import { heroStats } from "@/lib/data"
import { Sparkles, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 inline-flex">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered School Management
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your School with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Intelligent
              </span>{" "}
              Management
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              FlexDesk revolutionizes education with AI-powered tools that streamline administration, enhance teaching,
              and create personalized learning experiences for every student.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/get-started">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/demo">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            <StatsGrid stats={heroStats} gridClassName="grid grid-cols-3 gap-6 lg:gap-8" />
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/flexdesk-hero.png"
                alt="FlexDesk Dashboard Preview"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
