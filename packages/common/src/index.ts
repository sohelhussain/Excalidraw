

import {z} from 'zod';


export const CreateUserSchema = z.object({
    email: z.string().min(3).max(20),
    password: z.string(),
    name: z.string(),
    photo: z.optional(z.string())
})

export const SigninUserSchema = z.object({
    email: z.string().min(3).max(20),
    password: z.string()
})

export const CreateRoomSchema = z.object({
    slug: z.string().min(3).max(20),
})
export const CreateShapeSchema = z.object({
    type: z.string(),
    width: z.optional(z.number()),
    height: z.optional(z.number()),
    startX: z.number(),
    startY: z.number(),
    endX: z.number(),
    endY: z.number(),
    radius: z.optional(z.number()),
    image: z.optional(z.string()),
    text: z.optional(z.string()),
    strokeColor: z.optional(z.string()),
    fillColor: z.optional(z.string()),
    round: z.optional(z.string())
})
