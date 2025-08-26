export const cloudinaryConfig = {
  name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME || '',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
  apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET || '',
  profileImageUploadPreset: process.env.NEXT_PUBLIC_PROFILE_IMAGE_UPLOAD_PRESET || '',
} as const

// Validate config
if (!cloudinaryConfig.name) {
  throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_NAME environment variable')
}
if (!cloudinaryConfig.profileImageUploadPreset) {
  throw new Error('Missing NEXT_PUBLIC_PROFILE_IMAGE_UPLOAD_PRESET environment variable')
}
if (!cloudinaryConfig.apiSecret) {
  throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_API_SECRET environment variable')
}
