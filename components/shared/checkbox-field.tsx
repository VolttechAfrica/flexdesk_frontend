import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CheckboxFieldProps {
  id: string
  label: React.ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  required?: boolean
  error?: string
  disabled?: boolean
  className?: string
}

export function CheckboxField({
  id,
  label,
  checked,
  onChange,
  required,
  error,
  disabled,
  className,
}: CheckboxFieldProps) {
  return (
    <div className={className}>
      <div className="flex items-start space-x-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
          className={error ? "border-red-500" : ""}
        />
        <Label
          htmlFor={id}
          className={`text-sm leading-5 ${disabled ? "text-gray-400" : "text-gray-700"} ${error ? "text-red-600" : ""}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      </div>
      {error && <p className="text-sm text-red-600 mt-1 ml-6">{error}</p>}
    </div>
  )
}
