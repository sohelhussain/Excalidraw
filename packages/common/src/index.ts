

import {z} from 'zod';


export const CreateUserSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
    name: z.string()
})

export const SigninUserSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string()
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20),
})