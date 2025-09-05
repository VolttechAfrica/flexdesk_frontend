import { User as UserType } from "@/lib/types/auth"


interface StudentOnboardingPageProps {
    user: UserType
    logout: () => void
}   

export default function StudentOnboardingPage({ user, logout }: StudentOnboardingPageProps) {
    return (
        <div>
            <h1>Student Onboarding</h1>
        </div>
    )
}