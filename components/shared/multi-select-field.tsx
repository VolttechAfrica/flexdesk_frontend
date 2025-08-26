"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectFieldProps {
  label: string
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  required?: boolean
  error?: string
  description?: string
  className?: string
  disabled?: boolean
}

export function MultiSelectField({
  label,
  options,
  value,
  onChange,
  placeholder = "Select options...",
  required,
  error,
  description,
  className,
  disabled,
}: MultiSelectFieldProps) {
  const [open, setOpen] = useState(false)

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue]
    onChange(newValue)
  }

  const selectedLabels = options.filter((option) => value.includes(option.value)).map((option) => option.label)

  return (
    <div className={className}>
      <Label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between ${error ? "border-red-500" : ""}`}
            disabled={disabled}
          >
            <span className="truncate">{selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder}</span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="max-h-60 overflow-auto p-2">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => handleToggle(option.value)}
              >
                <Checkbox checked={value.includes(option.value)} onChange={() => handleToggle(option.value)} />
                <span className="text-sm">{option.label}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
