import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { apiClient } from "@/lib/api/client"
import type { User as UserType, AssignedClassData, AssignedSubjectData } from "@/lib/types/auth"
import { z } from "zod"

type UserWithConditionalAssignments = Omit<UserType, "assignedClasses" | "assignedSubjects"> & {
  assignedClasses?: AssignedClassData[]
  assignedSubjects?: AssignedSubjectData[]
}

export interface UserInformation {
  user: UserWithConditionalAssignments
  additionalData?: Record<string, any>
  lastUpdated: string
}

export interface UserInformationParams {
  userId: string
  userType: "staff" | "parent" | "student" | "bursar"
}

interface UserInformationEntry {
  data: UserInformation | null
  loading: boolean
  error: string | null
}

interface UserInformationStoreState {
  entries: Record<string, UserInformationEntry>
  getCacheKey: (params: UserInformationParams) => string
  isStale: (entry?: UserInformation | null) => boolean
  setEntry: (key: string, entry: Partial<UserInformationEntry>) => void
  clearEntry: (params: UserInformationParams) => void
  fetchUserInformation: (params: UserInformationParams, options?: { force?: boolean }) => Promise<void>
}

const STALE_THRESHOLD_MS = 2 * 60 * 1000

const userInformationSchema = z.object({
  user: z
    .object({
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
      assignedClasses: z
        .array(
          z.object({
            classId: z.string(),
            classArmId: z.string(),
          }),
        )
        .optional(),
      assignedSubjects: z
        .array(
          z.object({
            subject: z.object({
              id: z.string(),
              name: z.string(),
              code: z.string(),
            }),
          }),
        )
        .optional(),
      phone: z.string(),
      address: z.string(),
      state: z.string(),
      lga: z.string(),
      city: z.string(),
      children: z
        .array(
          z.object({
            id: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            class: z.object({ id: z.string(), name: z.string(), level: z.number() }),
            classArm: z.object({ id: z.string(), name: z.string() }),
            school: z.object({ id: z.string(), name: z.string(), shortName: z.string() }),
          }),
        )
        .optional(),
    })
    .superRefine((user, ctx) => {
      if (user.type !== "ADMIN") {
        if (!user.assignedClasses || user.assignedClasses.length === 0) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["assignedClasses"], message: "assignedClasses is required for non-ADMIN users" })
        }
        const isClassRoomTeacher = user.type === "CLASS_ROOM_TEACHER"
        if (!isClassRoomTeacher && (!user.assignedSubjects || user.assignedSubjects.length === 0)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["assignedSubjects"], message: "assignedSubjects is required unless user is CLASS_ROOM_TEACHER or ADMIN" })
        }
      }
    }),
  additionalData: z.record(z.any()).optional(),
  lastUpdated: z.string(),
})

export const useUserInformationStore = create<UserInformationStoreState>()(
  persist(
    (set, get) => ({
      entries: {},

      getCacheKey: ({ userId, userType }) => `user_${userId}_${userType}`,

      isStale: (entry) => {
        if (!entry) return true
        const last = new Date(entry.lastUpdated).getTime()
        return Date.now() - last > STALE_THRESHOLD_MS
      },

      setEntry: (key, partial) =>
        set((state) => ({
          entries: {
            ...state.entries,
            [key]: {
              data: state.entries[key]?.data ?? null,
              loading: state.entries[key]?.loading ?? false,
              error: state.entries[key]?.error ?? null,
              ...partial,
            },
          },
        })),

      clearEntry: (params) =>
        set((state) => {
          const key = state.getCacheKey(params)
          const { [key]: _removed, ...rest } = state.entries
          return { entries: rest }
        }),

      fetchUserInformation: async (params, options) => {
        const key = get().getCacheKey(params)
        const existing = get().entries[key]

        const shouldSkip = existing && existing.data && !get().isStale(existing.data) && !options?.force
        if (shouldSkip) return

        get().setEntry(key, { loading: true, error: null })

        try {
          const query = new URLSearchParams({ userId: params.userId, userType: params.userType, timestamp: Date.now().toString() })
          const response = await apiClient.get<UserInformation>(`/users/information?${query.toString()}`)

          const validated = userInformationSchema.parse({ ...response.data, lastUpdated: new Date().toISOString() })

          get().setEntry(key, { data: validated, loading: false, error: null })
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Failed to fetch user information"
          get().setEntry(key, { loading: false, error: msg })
        }
      },
    }),
    {
      name: "fd_user_information_v1",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ entries: state.entries }),
      version: 1,
      migrate: (persisted, _version) => {
        if (!persisted || typeof persisted !== "object") return { entries: {} }
        const { entries } = persisted as { entries?: Record<string, UserInformationEntry> }
        return { entries: entries || {} }
      },
    },
  ),
)


