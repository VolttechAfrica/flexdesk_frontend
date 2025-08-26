import { z } from "zod"

export const routeSchema = z.object({
    login: z.object({
        method: z.literal("POST"),
        path: z.literal("/login"),
        handler: z.function().args(z.any()).returns(z.any()),
    }),
    register: z.object({
        method: z.literal("POST"),
        path: z.literal("/register"),
        handler: z.function().args(z.any()).returns(z.any()),
    }),
})