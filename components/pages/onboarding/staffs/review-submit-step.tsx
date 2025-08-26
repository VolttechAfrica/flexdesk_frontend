"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, User, GraduationCap, Shield, Loader2 } from "lucide-react"
import type { StaffOnboardingData } from "@/lib/types/staff-onboarding"
import {
  GENDER_OPTIONS,
  NIGERIAN_STATES,
  QUALIFICATION_TYPES,
  GRADE_OPTIONS,
  RELATIONSHIP_OPTIONS,
} from "@/lib/data/staff-onboarding"

interface ReviewSubmitStepProps {
  data: StaffOnboardingData
  onSubmit: () => Promise<void>
  onBack: () => void
}

export function ReviewSubmitStep({ data, onSubmit, onBack }: ReviewSubmitStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit()
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDisplayValue = (value: string, options: { value: string; label: string }[]) => {
    return options.find((option) => option.value === value)?.label || value
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Review & Submit
        </CardTitle>
        <CardDescription>Please review your information before submitting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <Card className="border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <p className="text-sm">{data.profile.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p className="text-sm">{data.profile.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Gender</p>
                <p className="text-sm">{getDisplayValue(data.profile.gender || "", GENDER_OPTIONS)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">State</p>
                <p className="text-sm">{getDisplayValue(data.profile.state || "", NIGERIAN_STATES)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-sm">{data.profile.address}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">City</p>
                <p className="text-sm">{data.profile.city}</p>
              </div>
              {data.profile.lga && (
                <div>
                  <p className="text-sm font-medium text-gray-500">LGA</p>
                  <p className="text-sm">{data.profile.lga}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card className="border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Professional Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.qualifications.map((qual, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Qualification {index + 1}</h4>
                  <Badge variant="secondary">{getDisplayValue(qual.qualification, QUALIFICATION_TYPES)}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-500">Institution</p>
                    <p>{qual.institution}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Course</p>
                    <p>{qual.course}</p>
                  </div>
                  {qual.grade && (
                    <div>
                      <p className="font-medium text-gray-500">Grade</p>
                      <p>{getDisplayValue(qual.grade, GRADE_OPTIONS)}</p>
                    </div>
                  )}
                  {qual.yearObtained && (
                    <div>
                      <p className="font-medium text-gray-500">Year Obtained</p>
                      <p>{qual.yearObtained}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.emergencyContact?.name && (
              <div>
                <h4 className="font-medium mb-2">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-500">Name</p>
                    <p>{data.emergencyContact.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Relationship</p>
                    <p>{getDisplayValue(data.emergencyContact.relationship, RELATIONSHIP_OPTIONS)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Phone</p>
                    <p>{data.emergencyContact.phoneNumber}</p>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Notification Preferences</h4>
              <div className="flex gap-2">
                {data.notifications?.email && <Badge variant="outline">Email</Badge>}
                {data.notifications?.sms && <Badge variant="outline">SMS</Badge>}
                {data.notifications?.push && <Badge variant="outline">Push</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
