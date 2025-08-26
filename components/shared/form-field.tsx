"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BaseFieldProps {
  label: string
  required?: boolean
  error?: string
  description?: string
  className?: string
}

interface InputFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "tel" | "number"
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

interface TextareaFieldProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  disabled?: boolean
}

interface SelectFieldProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  options: Array<{ value: string; label: string }>
  disabled?: boolean
}

export function InputField({
  label,
  required,
  error,
  description,
  className,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
}: InputFieldProps) {
  return (
    <div className={className}>
      <Label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

export function TextareaField({
  label,
  required,
  error,
  description,
  className,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled,
}: TextareaFieldProps) {
  return (
    <div className={className}>
      <Label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

export function SelectField({
  label,
  required,
  error,
  description,
  className,
  value,
  onChange,
  placeholder,
  options,
  disabled,
}: SelectFieldProps) {
  return (
    <div className={className}>
      <Label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
