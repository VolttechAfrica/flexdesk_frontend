"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, ArrowLeft, HelpCircle, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  const popularPages = [
    {
      title: "Features",
      description: "Explore our AI-powered school management features",
      href: "/features",
      icon: Search,
    },
    {
      title: "Solutions for Administrators",
      description: "Complete school management tools for administrators",
      href: "/solutions/administrators",
      icon: HelpCircle,
    },
    {
      title: "Solutions for Teachers",
      description: "AI-enhanced teaching tools and classroom management",
      href: "/solutions/teachers",
      icon: HelpCircle,
    },
    {
      title: "Support Center",
      description: "Get help and find answers to your questions",
      href: "/support",
      icon: HelpCircle,
    },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <div className="text-8xl lg:text-9xl font-bold text-blue-600 mb-4">404</div>
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Page Not Found</h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the
                  wrong URL.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" onClick={() => router.back()} className="text-lg px-8">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Go Back
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Pages */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Looking for something specific?</h2>
                <p className="text-lg text-gray-600">
                  Here are some popular pages that might help you find what you're looking for.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {popularPages.map((page, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow group">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                          <page.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">
                            <Link href={page.href} className="block">
                              {page.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-gray-600">{page.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Still can't find what you're looking for?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Try searching our help center or get in touch with our support team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/support">
                    <Search className="mr-2 h-5 w-5" />
                    Search Help Center
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/support#contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Need Immediate Help?</h2>
              <p className="text-lg opacity-90 mb-8">
                Our support team is available 24/7 to assist you with any questions or issues.
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <Mail className="h-8 w-8 mx-auto mb-3 opacity-90" />
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-sm opacity-90 mb-3">Response within 2 hours</p>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href="mailto:support@flexdesk.com">Send Email</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-8 w-8 mx-auto mb-3 opacity-90" />
                    <h3 className="font-semibold mb-2">Phone Support</h3>
                    <p className="text-sm opacity-90 mb-3">Mon-Fri 8AM-8PM EST</p>
                    <Button variant="secondary" size="sm" asChild>
                      <Link href="tel:1-800-FLEXDESK">Call Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
