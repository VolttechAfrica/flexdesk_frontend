"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <FileText className="h-4 w-4 mr-2" />
                Terms of Service
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
              <p className="text-xl text-gray-600">Last updated: January 1, 2024</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing and using FlexDesk's services, you agree to be bound by these Terms of Service and all
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                using our services.
              </p>

              <h2>Description of Service</h2>
              <p>
                FlexDesk provides a comprehensive school management platform that includes student information systems,
                communication tools, AI-powered features, and administrative capabilities for educational institutions.
              </p>

              <h2>User Accounts</h2>
              <h3>Account Creation</h3>
              <p>To use our services, you must:</p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Be at least 13 years old or have parental consent</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h3>Account Responsibilities</h3>
              <p>You are responsible for:</p>
              <ul>
                <li>All activities that occur under your account</li>
                <li>Maintaining the confidentiality of your login information</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>

              <h2>Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use our services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Upload malicious code or harmful content</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                FlexDesk and its content, features, and functionality are owned by FlexDesk and are protected by
                international copyright, trademark, and other intellectual property laws.
              </p>

              <h2>Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
                information. By using our services, you consent to our data practices as described in our Privacy
                Policy.
              </p>

              <h2>Payment Terms</h2>
              <h3>Subscription Fees</h3>
              <p>
                Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except
                as required by law or as specifically stated in these terms.
              </p>

              <h3>Free Trials</h3>
              <p>
                We may offer free trials for our services. At the end of the trial period, you will be charged the
                applicable subscription fee unless you cancel before the trial expires.
              </p>

              <h2>Service Availability</h2>
              <p>
                We strive to maintain 99.9% uptime for our services. However, we do not guarantee uninterrupted access
                and may perform maintenance that temporarily affects availability.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, FlexDesk shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your use of our services.
              </p>

              <h2>Indemnification</h2>
              <p>
                You agree to indemnify and hold FlexDesk harmless from any claims, damages, or expenses arising from
                your use of our services or violation of these terms.
              </p>

              <h2>Termination</h2>
              <p>
                We may terminate or suspend your account at any time for violation of these terms. You may cancel your
                subscription at any time through your account settings.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of material changes and
                continued use constitutes acceptance of the modified terms.
              </p>

              <h2>Governing Law</h2>
              <p>
                These terms are governed by the laws of the State of California, without regard to conflict of law
                principles.
              </p>

              <h2>Contact Information</h2>
              <p>If you have questions about these Terms of Service, please contact us at:</p>
              <ul>
                <li>Email: legal@flexdesk.com</li>
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
