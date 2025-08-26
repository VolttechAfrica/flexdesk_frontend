import formatUserId from "@/lib/utils/formatUserId"
import { cloudinaryConfig } from "@/lib/config/cloudinary"
import CryptoJS from "crypto-js"
import { apiClient } from "@/lib/api/client"

interface ProfileImageUploaderProps {
    file: File
    userId: string
    schoolId: string
}

interface ProfileImageUploaderOptions {
    allowedMimeTypes?: string[]
    maxSizeMB?: number
    timeoutMs?: number
    deleteRetries?: number
}

interface CloudinaryUploadResponse {
    asset_id?: string
    public_id: string
    version?: number
    version_id?: string
    signature?: string
    width?: number
    height?: number
    format?: string
    resource_type?: string
    created_at?: string
    tags?: string[]
    bytes?: number
    type?: string
    etag?: string
    url?: string
    secure_url: string
    folder?: string
    access_mode?: string
    original_filename?: string
    [key: string]: unknown
}

interface CloudinaryDeleteResponse {
    result: string
    [key: string]: unknown
}

interface CloudinaryErrorResponse {
    error: {
        message: string
        http_code?: number
        [key: string]: unknown
    }
}


function validateFile(file: File, { allowedMimeTypes, maxSizeMB }: { allowedMimeTypes: string[]; maxSizeMB: number }): void {
    if (!file) {
        throw new Error("No file provided")
    }
    
    if (!allowedMimeTypes.includes(file.type)) {
        throw new Error(`Unsupported file type: ${file.type || "unknown"}. Allowed types: ${allowedMimeTypes.join(", ")}`)
    }
    
    const maxBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxBytes) {
        throw new Error(`File too large. Maximum size allowed: ${maxSizeMB}MB`)
    }
    
    if (file.size === 0) {
        throw new Error("File is empty")
    }
}

function generateCloudinarySignature(params: Record<string, string>): string {
    // Sort parameters alphabetically as required by Cloudinary
    const sortedParams = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join("&")
    
    // Use HMAC-SHA1 as required by Cloudinary
    return CryptoJS.HmacSHA1(sortedParams, cloudinaryConfig.apiSecret).toString()
}

export async function deleteProfileImage(
    userId: string, 
    schoolId: string, 
    retries: number = 2
): Promise<boolean> {
    const publicId = `${schoolId}_Profile_${formatUserId(userId)}`
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            
            
            const params: Record<string, string> = {
                public_id: publicId,
            }
            
            const { data: { signature, timestamp } } = await apiClient.post("/cloudinary/signature", params)
            
            const formData = new FormData()
            formData.append("signature", signature)
            formData.append("timestamp", timestamp)
            formData.append("api_key", cloudinaryConfig.apiKey)
            formData.append("public_id", publicId)
            formData.append("resource_type", "image")
            
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.name}/image/destroy`, {
                method: "POST",
                body: formData,
            })
            
            const data = await response.json() as CloudinaryDeleteResponse | CloudinaryErrorResponse
            
            if (!response.ok) {
                const errorMessage = 'error' in data && typeof data.error === 'object' && data.error && 'message' in data.error 
                    ? String(data.error.message) 
                    : 'Unknown error'
                console.warn(`Delete attempt ${attempt} failed: ${errorMessage}`)
                
                if (attempt === retries) {
                    console.warn(`Failed to delete old profile image after ${retries} attempts: ${publicId}`)
                    return false
                }
                
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
                continue
            }
            
            console.log(`Successfully deleted old profile image: ${publicId}`)
            return true
            
        } catch (error) {
            console.warn(`Delete attempt ${attempt} error:`, error)
            
            if (attempt === retries) {
                console.warn(`Failed to delete old profile image after ${retries} attempts due to errors`)
                return false
            }
            
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
    }
    
    return false
}

const profileImageUploader = async (
    { file, userId, schoolId }: ProfileImageUploaderProps,
    options: ProfileImageUploaderOptions = {}
): Promise<string> => {
    const {
        allowedMimeTypes = ["image/png", "image/jpeg", "image/webp"],
        maxSizeMB = 5,
        timeoutMs = 30000,
        deleteRetries = 2,
    } = options

    if (!userId?.trim()) {
        throw new Error("User ID is required and cannot be empty")
    }
    if (!schoolId?.trim()) {
        throw new Error("School ID is required and cannot be empty")
    }
    
    validateFile(file, { allowedMimeTypes, maxSizeMB })

    try {
        await deleteProfileImage(userId, schoolId, deleteRetries)
    } catch (error) {
        console.warn("Profile image deletion failed, proceeding with upload:", error)
    }

    
    
    const params: Record<string, string> = {
        public_id: `${schoolId}_Profile_${formatUserId(userId)}`,
    }
    
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", cloudinaryConfig.profileImageUploadPreset)
    formData.append("public_id", `${schoolId}_Profile_${formatUserId(userId)}`)
    formData.append("resource_type", "image")

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.name}/image/upload`, {
            method: "POST",
            body: formData,
            signal: controller.signal,
        })

        if (!response.ok) {
            const errorData = await response.json() as CloudinaryErrorResponse
            const errorMessage = errorData?.error?.message || `Upload failed with status ${response.status}`
            throw new Error(errorMessage)
        }

        const data = await response.json() as CloudinaryUploadResponse

        if (!data?.secure_url) {
            throw new Error("Upload successful but no secure URL returned")
        }

        console.log(`Profile image uploaded successfully: ${data.public_id}`)
        return data.secure_url

    } catch (error) {
        if (error instanceof Error) {
            if (error.name === "AbortError") {
                throw new Error("Upload timed out. Please try again.")
            }
            throw error
        }
        throw new Error("Failed to upload profile image")
    } finally {
        clearTimeout(timeout)
    }
}

export default profileImageUploader