"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Shield, ArrowLeft, Bell } from "lucide-react"
import type { ParentEmergencyContact, ParentNotificationPreferences } from "@/lib/types/parentOnboarding"
import { RELATIONSHIP_OPTIONS } from "@/lib/data/onboarding"

const emergencyContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  relationship: z.string().min(1, "Please select a relationship"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
})

type EmergencyContactFormData = z.infer<typeof emergencyContactSchema>

interface EmergencyContactStepProps {
  data: {
    emergencyContact?: ParentEmergencyContact
    notifications?: ParentNotificationPreferences
  }
  onUpdate: (data: {
    emergencyContact?: Partial<ParentEmergencyContact>
    notifications?: Partial<ParentNotificationPreferences>
  }) => void
  onNext: () => void
  onBack: () => void
}

export function EmergencyContactStep({ data, onUpdate, onNext, onBack }: EmergencyContactStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState<ParentNotificationPreferences>(
    data.notifications || {
      email: true,
      sms: false,
      whatsapp: false,
      schoolUpdates: true,
      academicReports: true,
      eventNotifications: true,
      emergencyAlerts: true,
    },
  )

  const form = useForm<EmergencyContactFormData>({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues: {
      name: data.emergencyContact?.name || "",
      relationship: data.emergencyContact?.relationship || "",
      phoneNumber: data.emergencyContact?.phoneNumber || "",
      email: data.emergencyContact?.email || "",
    },
  })

  const onSubmit = async (formData: EmergencyContactFormData) => {
    setIsLoading(true)
    try {
      onUpdate({
        emergencyContact: formData,
        notifications: notifications,
      })
      onNext()
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationChange = (key: keyof ParentNotificationPreferences, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-orange-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Emergency Contact & Communication Preferences</CardTitle>
          <p className="text-gray-600 mt-2">
            Configure emergency contact information and establish communication preferences for official school notifications.
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Emergency Contact */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Shield className="h-4 w-4" />
                  <span>Emergency Contact Details</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter emergency contact's full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship to Student *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship to student" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {RELATIONSHIP_OPTIONS.map((relationship) => (
                              <SelectItem key={relationship} value={relationship}>
                                {relationship}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., +234 803 456 7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email Address (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Bell className="h-4 w-4" />
                  <span>School Communication Preferences</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Preferred Communication Channels</h4>
                    {[
                      { key: "email" as const, label: "Email Communications" },
                      { key: "sms" as const, label: "SMS Text Messages" },
                      { key: "whatsapp" as const, label: "WhatsApp Messages" },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={notifications[key]}
                          onCheckedChange={(checked) => handleNotificationChange(key, !!checked)}
                        />
                        <label
                          htmlFor={key}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Communication Categories</h4>
                    {[
                      { key: "schoolUpdates" as const, label: "Institutional Updates" },
                      { key: "academicReports" as const, label: "Academic Progress Reports" },
                      { key: "eventNotifications" as const, label: "School Event Announcements" },
                      { key: "emergencyAlerts" as const, label: "Emergency Communications" },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={notifications[key]}
                          onCheckedChange={(checked) => handleNotificationChange(key, !!checked)}
                        />
                        <label
                          htmlFor={key}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button type="submit" disabled={isLoading} className="px-8">
                  {isLoading ? "Saving Configuration..." : "Continue"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
