"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Plus, Trash2 } from "lucide-react"
import { QUALIFICATION_TYPES, GRADE_OPTIONS } from "@/lib/data/staff-onboarding"
import type { StaffQualification } from "@/lib/types/staff-onboarding"

interface ProfessionalInfoStepProps {
  data: StaffQualification[]
  onUpdate: (data: StaffQualification[]) => void
  onNext: () => void
  onBack: () => void
}

export function ProfessionalInfoStep({ data, onUpdate, onNext, onBack }: ProfessionalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const addQualification = () => {
    const newQualification: StaffQualification = {
      qualification: "",
      institution: "",
      course: "",
      grade: "",
      yearObtained: "",
    }
    onUpdate([...data, newQualification])
  }

  const removeQualification = (index: number) => {
    const updated = data.filter((_, i) => i !== index)
    onUpdate(updated)
  }

  const updateQualification = (index: number, field: keyof StaffQualification, value: string) => {
    const updated = data.map((qual, i) => (i === index ? { ...qual, [field]: value } : qual))
    onUpdate(updated)
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (data.length === 0) {
      newErrors.qualifications = "At least one qualification is required"
    } else {
      data.forEach((qual, index) => {
        if (!qual.qualification) {
          newErrors[`qualification_${index}`] = "Qualification type is required"
        }
        if (!qual.institution) {
          newErrors[`institution_${index}`] = "Institution is required"
        }
        if (!qual.course) {
          newErrors[`course_${index}`] = "Course/Program is required"
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      onNext()
    }
  }

  // Initialize with one qualification if empty
  if (data.length === 0) {
    addQualification()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          Professional Details
        </CardTitle>
        <CardDescription>Add your educational qualifications and professional certifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {errors.qualifications && <p className="text-sm text-red-500">{errors.qualifications}</p>}

        {data.map((qualification, index) => (
          <Card key={index} className="border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Qualification {index + 1}</CardTitle>
                {data.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQualification(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Qualification Type *</Label>
                  <Select
                    value={qualification.qualification}
                    onValueChange={(value) => updateQualification(index, "qualification", value)}
                  >
                    <SelectTrigger className={errors[`qualification_${index}`] ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      {QUALIFICATION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors[`qualification_${index}`] && (
                    <p className="text-sm text-red-500">{errors[`qualification_${index}`]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    placeholder="University/Institution name"
                    value={qualification.institution}
                    onChange={(e) => updateQualification(index, "institution", e.target.value)}
                    className={errors[`institution_${index}`] ? "border-red-500" : ""}
                  />
                  {errors[`institution_${index}`] && (
                    <p className="text-sm text-red-500">{errors[`institution_${index}`]}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Course/Program *</Label>
                <Input
                  placeholder="e.g., Computer Science, Mathematics Education"
                  value={qualification.course}
                  onChange={(e) => updateQualification(index, "course", e.target.value)}
                  className={errors[`course_${index}`] ? "border-red-500" : ""}
                />
                {errors[`course_${index}`] && <p className="text-sm text-red-500">{errors[`course_${index}`]}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Grade/Class</Label>
                  <Select
                    value={qualification.grade || ""}
                    onValueChange={(value) => updateQualification(index, "grade", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADE_OPTIONS.map((grade) => (
                        <SelectItem key={grade.value} value={grade.value}>
                          {grade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Year Obtained</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 2020"
                    min="1950"
                    max={new Date().getFullYear()}
                    value={qualification.yearObtained || ""}
                    onChange={(e) => updateQualification(index, "yearObtained", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button variant="outline" onClick={addQualification} className="w-full border-dashed bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Qualification
        </Button>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleNext}>Next Step</Button>
        </div>
      </CardContent>
    </Card>
  )
}
