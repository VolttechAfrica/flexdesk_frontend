"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MessageSquare, Phone, ArrowLeft } from "lucide-react"
import type {
  ParentProfile,
  ParentEmergencyContact,
  ParentNotificationPreferences,
} from "@/lib/types/parentOnboarding"
import { CONTACT_METHODS } from "@/lib/data/onboarding"

const contactPreferencesSchema = z.object({
  altPhone: z.string().optional(),
  preferredContactMethod: z.enum(["EMAIL", "SMS", "WHATSAPP"]),
})

type ContactPreferencesFormData = z.infer<typeof contactPreferencesSchema>

interface ContactPreferencesStepProps {
  data: {
    profile?: ParentProfile
    emergencyContact?: ParentEmergencyContact
    notifications?: ParentNotificationPreferences
  }
  onUpdate: (data: {
    profile?: Partial<ParentProfile>
    emergencyContact?: Partial<ParentEmergencyContact>
    notifications?: Partial<ParentNotificationPreferences>
  }) => void
  onNext: () => void
  onBack: () => void
}

export function ContactPreferencesStep({ data, onUpdate, onNext, onBack }: ContactPreferencesStepProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ContactPreferencesFormData>({
    resolver: zodResolver(contactPreferencesSchema),
    defaultValues: {
      altPhone: data.profile?.altPhone || "",
      preferredContactMethod: data.profile?.preferredContactMethod || "EMAIL",
    },
  })

  const onSubmit = async (formData: ContactPreferencesFormData) => {
    setIsLoading(true)
    try {
      onUpdate({ profile: formData })
      onNext()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Contact Information & Communication Preferences</CardTitle>
          <p className="text-gray-600 mt-2">Configure your contact details and establish communication preferences for official school correspondence.</p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Backup Phone */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Phone className="h-4 w-4" />
                  <span>Secondary Contact Information</span>
                </div>

                <FormField
                  control={form.control}
                  name="altPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., +234 802 345 6789" {...field} />
                      </FormControl>
                      <p className="text-sm text-gray-500">
                        This number will be used for official communications when your primary contact number is unavailable.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="preferredContactMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Communication Method *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 gap-4"
                        >
                          {CONTACT_METHODS.map((method) => (
                            <div
                              key={method.value}
                              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                            >
                              <RadioGroupItem value={method.value} id={method.value} />
                              <label htmlFor={method.value} className="flex-1 cursor-pointer">
                                <div className="font-medium">{method.label}</div>
                                <div className="text-sm text-gray-500">
                                  {method.value === "EMAIL" && "Receive official communications via email"}
                                  {method.value === "SMS" && "Receive official communications via text messages"}
                                  {method.value === "WHATSAPP" && "Receive official communications via WhatsApp messages"}
                                </div>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
