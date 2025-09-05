import { useEffect, useState, useCallback, useMemo } from "react";
import { apiClient } from "@/lib/api/client";
import { User as UserType, AssignedClassData, AssignedSubjectData } from "@/lib/types/auth";
import { z } from "zod";


type UserWithConditionalAssignments = Omit<UserType, "assignedClasses" | "assignedSubjects"> & {
  assignedClasses?: AssignedClassData[];
  assignedSubjects?: AssignedSubjectData[];
};

interface UserInformation {
  user: UserWithConditionalAssignments;
  additionalData?: Record<string, any>;
  lastUpdated: string;
}

interface UserInformationParams {
  userId: string;
  userType: "staff" | "parent" | "student" | "bursar";
}

interface UseUserInformationReturn {
  userInformation: UserInformation | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isStale: boolean;
}

// Validation Schema
const userInformationSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    otherName: z.string().optional(),
    status: z.string(),
    userType: z.enum(["staff", "parent", "student", "bursar"]),
    schoolId: z.string(),
    roleId: z.string(),
    type: z.enum(["ADMIN", "CLASS_ROOM_TEACHER", "SUBJECT_TEACHER", "OTHER"]).optional(),
    role: z.string(),
    school: z.object({
      id: z.string(),
      name: z.string(),
      shortName: z.string(),
      email: z.string(),
      phone: z.string(),
      address: z.string(),
      slogan: z.string(),
      logo: z.string(),
      website: z.string(),
      state: z.string(),
      lga: z.string(),
      country: z.string(),
      status: z.string(),
    }),
    profile: z.object({
      profilePicture: z.string(),
      dateOfBirth: z.string(),
      phoneNumber: z.string(),
      address: z.string(),
      state: z.string(),
      lga: z.string(),
      gender: z.string().optional(),
      city: z.string().optional(),
    }),
    assignedClasses: z.array(z.object({
      classId: z.string(),
      classArmId: z.string(),
    })).optional(),
    assignedSubjects: z.array(z.object({
      subject: z.object({
        id: z.string(),
        name: z.string(),
        code: z.string(),
      }),
    })).optional(),
    phone: z.string(),
    address: z.string(),
    state: z.string(),
    lga: z.string(),
    city: z.string(),
    children: z.array(z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      class: z.object({
        id: z.string(),
        name: z.string(),
        level: z.number(),
      }),
      classArm: z.object({
        id: z.string(),
        name: z.string(),
      }),
      school: z.object({
        id: z.string(),
        name: z.string(),
        shortName: z.string(),
      }),
    })).optional(),
  }).superRefine((user, ctx) => {
    // Conditional requirements based on user.type
    if (user.type !== 'ADMIN') {
      // assignedClasses is always required for non-ADMIN users
      if (!user.assignedClasses || user.assignedClasses.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['assignedClasses'],
          message: 'assignedClasses is required for non-ADMIN users',
        })
      }

      // assignedSubjects is required for non-ADMIN users EXCEPT CLASS_ROOM_TEACHER
      const isClassRoomTeacher = user.type === 'CLASS_ROOM_TEACHER'
      if (!isClassRoomTeacher && (!user.assignedSubjects || user.assignedSubjects.length === 0)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['assignedSubjects'],
          message: 'assignedSubjects is required unless user is CLASS_ROOM_TEACHER or ADMIN',
        })
      }
    }
  }),
  additionalData: z.record(z.any()).optional(),
  lastUpdated: z.string(),
});


const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STALE_THRESHOLD = 2 * 60 * 1000; // 2 minutes

/**
 * Custom hook for fetching and managing user information
 * 
 * @param params - Object containing userId and userType
 * @returns UserInformation state and utility functions
 */
export const useUserInformation = (params: UserInformationParams): UseUserInformationReturn => {
  const { userId, userType } = params;
  

  const [userInformation, setUserInformation] = useState<UserInformation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized cache key for efficient re-renders
  const cacheKey = useMemo(() => `user_${userId}_${userType}`, [userId, userType]);

  /**
   * Validates user information data against schema
   */
  const validateUserInformation = useCallback((data: unknown): UserInformation => {
    try {
      return userInformationSchema.parse(data);
    } catch (validationError) {
      throw new Error(`Invalid user information data: ${validationError}`);
    }
  }, []);

  /**
   * Checks if cached data is stale
   */
  const isDataStale = useCallback((lastUpdated: string): boolean => {
    const lastUpdateTime = new Date(lastUpdated).getTime();
    const now = Date.now();
    return (now - lastUpdateTime) > STALE_THRESHOLD;
  }, []);

  /**
   * Fetches user information from API
   */
  const fetchUserInformation = useCallback(async (): Promise<void> => {
    if (!userId || !userType) {
      setError("User ID and user type are required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        userId,
        userType,
        timestamp: Date.now().toString(), 
      });

      const response = await apiClient.get<UserInformation>(
        `/users/information?${queryParams.toString()}`
      );

      const validatedData = validateUserInformation(response.data);
      
      // Add timestamp for cache management
      const userInfoWithTimestamp: UserInformation = {
        ...validatedData,
        lastUpdated: new Date().toISOString(),
      };

      setUserInformation(userInfoWithTimestamp);
      
      // Store in session storage for persistence
      if (typeof window !== "undefined") {
        sessionStorage.setItem(cacheKey, JSON.stringify(userInfoWithTimestamp));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch user information";
      setError(errorMessage);
      
      // Try to load from cache on error
      if (typeof window !== "undefined") {
        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData) {
          try {
            const parsedData = JSON.parse(cachedData);
            setUserInformation(parsedData);
          } catch (parseError) {
            console.warn("Failed to parse cached user information");
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }, [userId, userType, validateUserInformation, cacheKey]);

  /**
   * Loads user information from cache if available and not stale
   */
  const loadFromCache = useCallback((): boolean => {
    if (typeof window === "undefined") return false;

    try {
      const cachedData = sessionStorage.getItem(cacheKey);
      if (!cachedData) return false;

      const parsedData = JSON.parse(cachedData) as UserInformation;
      
      // Check if data is not stale
      if (!isDataStale(parsedData.lastUpdated)) {
        setUserInformation(parsedData);
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.warn("Failed to load user information from cache:", error);
    }

    return false;
  }, [cacheKey, isDataStale]);

  /**
   * Public refetch function for manual data refresh
   */
  const refetch = useCallback(async (): Promise<void> => {
    await fetchUserInformation();
  }, [fetchUserInformation]);


  useEffect(() => {
    const cacheLoaded = loadFromCache();
    
    // If cache is stale or doesn't exist, fetch from API
    if (!cacheLoaded) {
      fetchUserInformation();
    }
  }, [loadFromCache, fetchUserInformation]);


  const isStale = useMemo(() => {
    if (!userInformation) return false;
    return isDataStale(userInformation.lastUpdated);
  }, [userInformation, isDataStale]);

  return {
    userInformation,
    loading,
    error,
    refetch,
    isStale,
  };
};

/**
 * Utility function to clear user information cache
 */
export const clearUserInformationCache = (userId: string, userType: string): void => {
  if (typeof window === "undefined") return;
  
  const cacheKey = `user_${userId}_${userType}`;
  sessionStorage.removeItem(cacheKey);
};

/**
 * Utility function to get cached user information without triggering a fetch
 */
export const getCachedUserInformation = (userId: string, userType: string): UserInformation | null => {
  if (typeof window === "undefined") return null;
  
  try {
    const cacheKey = `user_${userId}_${userType}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    
    if (!cachedData) return null;
    
    return JSON.parse(cachedData) as UserInformation;
  } catch (error) {
    console.warn("Failed to get cached user information:", error);
    return null;
  }
};

/**
 * Example usage:
 * 
 * ```typescript
 * import { useUserInformation } from '@/hooks/use-userInformation';
 * 
 * const MyComponent = () => {
 *   const { 
 *     userInformation, 
 *     loading, 
 *     error, 
 *     refetch, 
 *     isStale 
 *   } = useUserInformation({
 *     userId: "user123",
 *     userType: "parent"
 *   });
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   if (!userInformation) return <div>No user data</div>;
 * 
 *   return (
 *     <div>
 *       <h1>Welcome, {userInformation.user.firstName}!</h1>
 *       {isStale && (
 *         <button onClick={refetch}>Refresh Data</button>
 *       )}
 *     </div>
 *   );
 * };
 * ```
 */