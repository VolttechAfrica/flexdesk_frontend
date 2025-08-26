"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, User, Phone, MapPin } from "lucide-react"
import { GENDER_OPTIONS, NIGERIAN_STATES } from "@/lib/data/staff-onboarding"
import type { StaffProfile } from "@/lib/types/staff-onboarding"
import { PassportUpload } from "@/components/shared/pages/passport-upload"
import { useAuth } from "@/lib/contexts/AuthContext"

interface PersonalInfoStepProps {
  data: StaffProfile
  onUpdate: (data: StaffProfile) => void
  onNext: () => void
  onBack?: () => void
}

export function PersonalInfoStep({ data, onUpdate, onNext, onBack }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { user } = useAuth()
  const handleInputChange = (field: keyof StaffProfile, value: string) => {
    onUpdate({ ...data, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (!data.phoneNumber) newErrors.phoneNumber = "Phone number is required"
    if (!data.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!data.gender) newErrors.gender = "Gender is required"
    if (!data.address) newErrors.address = "Address is required"
    if (!data.state) newErrors.state = "State is required"
    if (!data.city) newErrors.city = "City is required"
    if (!data.profilePicture) newErrors.profilePicture = "A clear passport photo is required"

    // Phone number validation
    if (data.phoneNumber && !/^(\+234|0)[789][01]\d{8}$/.test(data.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid Nigerian phone number"
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
          <User className="h-5 w-5 text-blue-600" />
          Personal Information
        </CardTitle>
        <CardDescription>Please provide your basic personal details and contact information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

      <div className="space-y-2">
          <Label>Passport Photo</Label>
          <PassportUpload
            value={data.profilePicture || ""}
            onChange={(url) => handleInputChange("profilePicture", url)}
            onError={(error) => setErrors({ ...errors, profilePicture: error })}
            userId={user?.id || ""}
            schoolId={user?.school.id || ""}
          />
          {errors.profilePicture && <p className="text-sm text-red-500">{errors.profilePicture}</p>}
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                placeholder="+234 or 0801234567"
                value={data.phoneNumber || ""}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className={`pl-10 ${errors.phoneNumber ? "border-red-500" : ""}`}
              />
            </div>
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="dob"
                type="date"
                value={data.dateOfBirth || ""}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                className={`pl-10 ${errors.dateOfBirth ? "border-red-500" : ""}`}
              />
            </div>
            {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select value={data.gender || ""} onValueChange={(value) => handleInputChange("gender", value)}>
            <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Textarea
              id="address"
              placeholder="Enter your full address"
              value={data.address || ""}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`pl-10 min-h-[80px] ${errors.address ? "border-red-500" : ""}`}
            />
          </div>
          {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Select value={data.state || ""} onValueChange={(value) => handleInputChange("state", value)}>
              <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {NIGERIAN_STATES.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              value={data.city || ""}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lga">LGA</Label>
            <Input
              id="lga"
              placeholder="Local Government Area"
              value={data.lga || ""}
              onChange={(e) => handleInputChange("lga", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button onClick={handleNext} className="ml-auto">
            Next Step
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
