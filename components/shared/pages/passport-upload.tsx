"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileImage, X, CheckCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import profileImageUploader, { deleteProfileImage } from "@/lib/services/profileImageUploader"

interface PassportUploadProps {
  value?: string
  onChange: (url: string) => void
  onError?: (error: string) => void
  userId: string
  schoolId: string
}

export function PassportUpload({ value, onChange, onError, userId, schoolId }: PassportUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!allowedTypes.includes(file.type)) {
      return "Please upload a JPEG or PNG image file"
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return "File size must be less than 5MB"
    }

    return null
  }

  const handleFileUpload = async (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      toast({
        title: "Invalid File",
        description: validationError,
        variant: "destructive",
      })
      onError?.(validationError)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const response = await profileImageUploader({ file, userId, schoolId })

      if (response) {
        onChange(response)
        toast({
          title: "Upload Successful",
          description: "Your passport photo has been uploaded successfully.",
        })
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      const errorMessage = "Failed to upload passport photo. Please try again."
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      })
      onError?.(errorMessage)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleRemove = () => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    deleteProfileImage(userId, schoolId)
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={value || "/placeholder.svg"}
                    alt="Passport"
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <CheckCircle className="absolute -top-2 -right-2 h-5 w-5 text-green-500 bg-white rounded-full" />
                </div>
                <div>
                  <p className="font-medium text-sm">Passport Photo</p>
                  <p className="text-xs text-gray-500">Upload successful</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemove} disabled={isUploading}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <div className="text-center">
              <FileImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Passport Photo</h3>
              <p className="text-sm text-gray-500 mb-4">Drag and drop your passport photo here, or click to browse</p>
              <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="mb-2">
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : "Choose File"}
              </Button>
              <p className="text-xs text-gray-400">JPEG or PNG, max 5MB</p>
            </div>

            {isUploading && (
              <div className="mt-4">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-center text-gray-500 mt-2">Uploading... {uploadProgress}%</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
