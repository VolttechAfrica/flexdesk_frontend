"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
              <p className="text-xl text-gray-600">Last updated: January 1, 2024</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Introduction</h2>
              <p>
                FlexDesk ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our school management
                platform and services.
              </p>

              <h2>Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>We may collect personal information that you provide directly to us, including:</p>
              <ul>
                <li>Name, email address, and contact information</li>
                <li>Student records and academic information</li>
                <li>Payment and billing information</li>
                <li>Communication preferences</li>
              </ul>

              <h3>Usage Information</h3>
              <p>We automatically collect certain information about your use of our services:</p>
              <ul>
                <li>Log data and usage patterns</li>
                <li>Device information and IP addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our services</li>
                <li>Process transactions and send notifications</li>
                <li>Improve our platform and develop new features</li>
                <li>Comply with legal obligations</li>
                <li>Communicate with you about our services</li>
              </ul>

              <h2>Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy. We may share information:
              </p>
              <ul>
                <li>With service providers who assist in our operations</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul>
                <li>AES-256 encryption for data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication measures</li>
                <li>FERPA compliance for educational records</li>
              </ul>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of certain communications</li>
                <li>Data portability where applicable</li>
              </ul>

              <h2>Children's Privacy</h2>
              <p>
                We are committed to protecting the privacy of children under 13. We comply with COPPA and FERPA
                requirements for handling student data and require parental consent where necessary.
              </p>

              <h2>International Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place for such transfers.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new policy on our website and updating the "Last updated" date.
              </p>

              <h2>Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <ul>
                <li>Email: privacy@flexdesk.com</li>
                <li>Phone: 1-800-FLEXDESK</li>
                <li>Address: 123 Education St, San Francisco, CA 94105</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
