

import {z} from 'zod';


export const CreateUserSchema = z.object({
    email: z.string().min(3).max(20),
    password: z.string(),
    name: z.string(),
    photo: z.string().optional()
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
    width: z.number().optional(),
    height: z.number().optional(),
    startX: z.number(),
    startY: z.number(),
    radius: z.number().optional(),
    image: z.string().optional(),
    text: z.string().optional(),
    strokeColor: z.string().optional(),
    fillColor: z.string().optional(),
    round: z.string().optional()
})
