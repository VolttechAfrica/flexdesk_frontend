export interface ForgotPasswordRequest {
    email: string
}

export interface ForgotPasswordData {
    email: string
    expiresIn: number
}

export interface ForgotPasswordResponse {
    status: boolean
    message: string
    data: ForgotPasswordData
}

export interface VerifyOTPRequest {
    email: string
    otp: string
}

interface VerifyOTPData {
    email: string
    resetToken: string
}

export interface VerifyOTPResponse {
    status: boolean
    message: string
    data: VerifyOTPData
}

export interface ChangePasswordRequest {
    email: string
    newPassword: string
    confirmPassword: string
    resetToken: string
}

export interface ChangePasswordResponse {
    status: boolean
    message: string
}