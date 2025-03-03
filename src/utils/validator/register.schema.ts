import {z as zod} from 'zod'

export const registerSchema = zod.object({
    email: zod.string().email('Invalid email format'),
    password: zod.string().min(8, 'Password must be at least 8 characters')
})

export type RegisterFormData = zod.infer<typeof registerSchema>

