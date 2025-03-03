import {z as zod} from 'zod'

export const loginSchema = zod.object({
    email: zod.string().email('Invalid email format'),
    password: zod.string().min(8, 'Password must be at least 8 characters')
})

export type LoginFormData = zod.infer<typeof loginSchema>

