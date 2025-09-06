import { useCallback, useEffect } from "react"
import { useUserInformationStore, type UserInformation, type UserInformationParams } from "@/lib/data/store/useUserInformationStore"

interface UseUserInformationReturn {
  userInformation: UserInformation | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isStale: boolean;
}

export const useUserInformation = (params: UserInformationParams): UseUserInformationReturn => {
  const { userId, userType } = params
  const store = useUserInformationStore()

  const key = store.getCacheKey({ userId, userType })
  const entry = store.entries[key]

  const data = entry?.data ?? null
  const loading = entry?.loading ?? false
  const error = entry?.error ?? null
  const isStale = store.isStale(data)

  const refetch = useCallback(async () => {
    await store.fetchUserInformation({ userId, userType }, { force: true })
  }, [store, userId, userType])

  useEffect(() => {
    // Serve cached data immediately; fetch in background if stale/missing
    store.fetchUserInformation({ userId, userType })

  }, [userId, userType])

  return { userInformation: data, loading, error, refetch, isStale }
}

// Basic Use
// import { useUserInformation } from '@/hooks/use-userInformation'

// const MyComponent = () => {
//   const { 
//     userInformation, 
//     loading, 
//     error, 
//     refetch, 
//     isStale 
//   } = useUserInformation({
//     userId: "user123",
//     userType: "parent" // "staff" | "parent" | "student" | "bursar"
//   })

//   if (loading) return <div>Loading...</div>
//   if (error) return <div>Error: {error}</div>
//   if (!userInformation) return <div>No user data</div>

//   return (
//     <div>
//       <h1>Welcome, {userInformation.user.firstName}!</h1>
//       <p>Email: {userInformation.user.email}</p>
//       <p>Role: {userInformation.user.role}</p>
      
//       {isStale && (
//         <button onClick={refetch}>Refresh Data</button>
//       )}
//     </div>
//   )
// }


// Advance Use
// const UserProfile = () => {
//   const { userInformation, loading, error, refetch, isStale } = useUserInformation({
//     userId: user.id,
//     userType: user.userType
//   })

//   // Handle different user types
//   if (userInformation?.user.userType === "parent") {
//     return <ParentDashboard user={userInformation.user} />
//   }
  
//   if (userInformation?.user.userType === "staff") {
//     return <StaffDashboard user={userInformation.user} />
//   }

//   return <div>Loading user profile...</div>
// }