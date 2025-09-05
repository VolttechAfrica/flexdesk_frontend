"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Users, Plus, CheckCircle } from "lucide-react"
import type { ParentOnboardingData } from "@/lib/types/parentOnboarding"
import { StudentData, User } from "@/lib/types/auth"
import { toast } from "@/hooks/use-toast"
import { useSupportForm } from "@/hooks/use-support-form"

interface ChildrenReviewStepProps {
  data: ParentOnboardingData
  onUpdate: (data: Partial<ParentOnboardingData>) => void
  user: User
  onNext: () => void
  onBack: () => void
  onSubmit: () => void
}

export function SetupReviewStep({ data, onUpdate, user, onNext, onBack, onSubmit }: ChildrenReviewStepProps) {
 
  const hasChildren = data.children && data.children.length > 0

  const { isSubmitting, isSuccess, error, ticket, submitTicket } = useSupportForm()

  const handleRequestChild = async () => {
   
    try {
      await submitTicket({
        schoolId: user?.school?.id || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        subject: "Student Association Request",
        message: "I request to be associated with my child's student account for parent portal access and communication purposes.",
        priority: "HIGH",
      })

      if (isSuccess) {
        toast({
          title: "Association Request Submitted",
          description:
            "Your student association request has been forwarded to the school administration for review and approval.",
        })
      }

      if(error) {
        throw new Error(error || "Unable to submit student association request. Please contact the school administration directly.")
      }

     
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Unable to submit student association request. Please contact the school administration directly.",
        variant: "destructive",
      })
    }
  }

  const getChildInitials = (child: StudentData) => {
    return `${child.firstName.charAt(0)}${child.lastName.charAt(0)}`.toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "INACTIVE":
        return "bg-yellow-100 text-yellow-800"
      case "GRADUATED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg p-8">
      <div className="text-center mb-8">
        <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Association & Account Review</h2>
        <p className="text-gray-600">Review associated student accounts and finalize your parent portal configuration</p>
      </div>

      {/* Children Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Associated Students</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRequestChild}
            disabled={isSubmitting}
            className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting Request..." : "Request Student Association"}
          </Button>
        </div>

        {hasChildren ? (
          <div className="grid gap-4">
            {data.children!.map((child) => (
              <Card key={child.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" alt={`${child.firstName} ${child.lastName}`} />
                      <AvatarFallback className="bg-green-100 text-green-600 font-semibold">
                        {getChildInitials(child)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {child.firstName} {child.otherName} {child.lastName}
                        </h4>
                        <Badge className={getStatusColor(child?.status || "")}>{child?.status}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-medium">Class:</span> {child?.class?.name} {child?.classArm?.name}
                        </p>
                        <p>
                          <span className="font-medium">Gender:</span> {child?.gender}
                        </p>
                        {child.id && (
                          <p>
                            <span className="font-medium">Admission No:</span> {child.id}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No Student Associations</h4>
              <p className="text-gray-600 mb-4">
                Student association is required to complete your parent portal configuration and access educational records.
              </p>
              <Button
                onClick={handleRequestChild}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isSubmitting ? "Submitting Request..." : "Request Student Association"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Profile Review Section */}
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900">Account Configuration Summary</h3>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Full Name:</span>
              <p className="font-medium">
                {[user?.firstName, user?.otherName, user?.lastName].filter(Boolean).join(" ") ||
                  "Not provided"}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Phone:</span>
              <p className="font-medium">{data.profile.phone || "Not provided"}</p>
            </div>
            <div>
              <span className="text-gray-500">Backup Phone:</span>
              <p className="font-medium">{data.profile.altPhone || "Not provided"}</p>
            </div>
            <div>
              <span className="text-gray-500">Preferred Contact:</span>
              <p className="font-medium">{data.profile.preferredContactMethod || "Not provided"}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-500">Address:</span>
              <p className="font-medium">
                {[data.profile.address, data.profile.city, data.profile.state].filter(Boolean).join(", ") ||
                  "Not provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Emergency Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Name:</span>
              <p className="font-medium">{data.emergencyContact.name || "Not provided"}</p>
            </div>
            <div>
              <span className="text-gray-500">Relationship:</span>
              <p className="font-medium">{data.emergencyContact.relationship || "Not provided"}</p>
            </div>
            <div>
              <span className="text-gray-500">Phone:</span>
              <p className="font-medium">{data.emergencyContact.phoneNumber || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        {hasChildren ? (
          <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Configuration
          </Button>
        ) : (
          <Button disabled className="bg-gray-400 cursor-not-allowed">
            Complete Configuration (Requires Student Association)
          </Button>
        )}
      </div>
    </div>
  )
}
