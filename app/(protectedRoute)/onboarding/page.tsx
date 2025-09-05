"use client"


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { UserRole, User as UserType } from "@/lib/types/auth";
import StaffOnboardingPage from "./StaffOnboarding";
import StudentOnboardingPage from "./StudentOnboarding";
import ParentOnboardingPage from "./ParentOnboarding";



export default function OnboardingPage() {
    const { user, logout } = useAuth()
    const [onboardingType, setOnboardingType] = useState<"staff" | "student" | "parent" | "bursar">("staff")

    const router = useRouter()

    useEffect(() => {
        if (!user?.userType) {
        router.replace("/login?message=Unknown user, please contact support")            
        }
        setOnboardingType(user?.userType as "staff" | "student" | "parent" | "bursar")
    }, [user])

    switch (onboardingType) {
        case "staff":
            return <StaffOnboardingPage user={user as UserType} logout={logout} />
        case "student":
            return <StudentOnboardingPage user={user as UserType} logout={logout} />
        case "parent":
            return <ParentOnboardingPage user={user as UserType} logout={logout} />
    }
}