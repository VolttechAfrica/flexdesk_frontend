export interface ForgotPasswordRequest {
    email: string
  }
  
  interface ForgotPasswordData {
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
  