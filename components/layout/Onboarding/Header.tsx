import { Button } from "@/components/ui/button"
import { LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/lib/types/auth"

interface OnboardingHeaderProps {
    user: User
    logout: () => void
}


export function OnboardingHeader({ user, logout }: OnboardingHeaderProps) {


    const getUserInitials = () => {
        if (user?.firstName && user?.lastName) {
          return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
        }
        return user?.email?.charAt(0).toUpperCase() || "U"
      }
    
      const getRoleDisplayName = () => {
        switch (user?.roleId) {
          case "801":
            return "Administrator"
        case "800":
            return "Principal"
          case "802":
            return "Super Administrator"
          case "803":
            return "Teacher"
          case "805":
            return "Parent"
          default:
            return "Staff Member"
        }
      }

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* User Info Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.profile?.profilePicture || "/images/avatar.jpeg"} alt={`${user?.firstName} ${user?.lastName}`} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-sm">
                  {getUserInitials()}
                </AvatarFallback>   
              </Avatar>
              <div>
                <h5 className="text-sm font-semibold text-gray-700">
                  {user?.firstName} {user?.lastName}
                </h5>
                <p className="text-xs text-gray-500">{getRoleDisplayName()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} className="text-gray-600 hover:text-gray-900">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
    )



}