"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Shield, Phone, Bell } from "lucide-react"
import { RELATIONSHIP_OPTIONS } from "@/lib/data/staff-onboarding"

interface AdditionalInfoData {
  emergencyContact?: {
    name: string
    relationship: string
    phoneNumber: string
  }
  notifications?: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

interface AdditionalInfoStepProps {
  data: AdditionalInfoData
  onUpdate: (data: AdditionalInfoData) => void
  onNext: () => void
  onBack: () => void
}

export function AdditionalInfoStep({ data, onUpdate, onNext, onBack }: AdditionalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateEmergencyContact = (field: string, value: string) => {
    onUpdate({
      ...data,
      emergencyContact: {
        ...data.emergencyContact,
        [field]: value,
      } as any,
    })
  }

  const updateNotifications = (field: string, value: boolean) => {
    onUpdate({
      ...data,
      notifications: {
        ...data.notifications,
        [field]: value,
      } as any,
    })
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (data.emergencyContact?.name && !data.emergencyContact?.phoneNumber) {
      newErrors.emergencyPhone = "Emergency contact phone number is required"
    }

    if (data.emergencyContact?.phoneNumber && !/^(\+234|0)[789][01]\d{8}$/.test(data.emergencyContact.phoneNumber)) {
      newErrors.emergencyPhone = "Please enter a valid Nigerian phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      onNext()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Additional Information
        </CardTitle>
        <CardDescription>Emergency contact details and notification preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Emergency Contact */}
        <Card className="border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Emergency Contact
            </CardTitle>
            <CardDescription>Someone we can contact in case of emergency (optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Emergency contact name"
                value={data.emergencyContact?.name || ""}
                onChange={(e) => updateEmergencyContact("name", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Relationship</Label>
                <Select
                  value={data.emergencyContact?.relationship || ""}
                  onValueChange={(value) => updateEmergencyContact("relationship", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {RELATIONSHIP_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="+234 or 0801234567"
                  value={data.emergencyContact?.phoneNumber || ""}
                  onChange={(e) => updateEmergencyContact("phoneNumber", e.target.value)}
                  className={errors.emergencyPhone ? "border-red-500" : ""}
                />
                {errors.emergencyPhone && <p className="text-sm text-red-500">{errors.emergencyPhone}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose how you'd like to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive updates and announcements via email</p>
              </div>
              <Switch
                checked={data.notifications?.email ?? true}
                onCheckedChange={(checked) => updateNotifications("email", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-500">Receive important alerts via SMS</p>
              </div>
              <Switch
                checked={data.notifications?.sms ?? false}
                onCheckedChange={(checked) => updateNotifications("sms", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-500">Receive real-time notifications in your browser</p>
              </div>
              <Switch
                checked={data.notifications?.push ?? true}
                onCheckedChange={(checked) => updateNotifications("push", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleNext}>Review & Submit</Button>
        </div>
      </CardContent>
    </Card>
  )
}
