import {z} from 'zod';

const email = z.string().email()
const password = z.string().min(4)
const name = z.string().min(4)


export const LoginDtoValidate = z.object({
    body: z.object({
        email,
        password
    })
})

export const RegisterDtoValidate = z.object({
    body:z.object({
        email,
        password,
        name
    })
})

export type LoginDto = z.infer<typeof LoginDtoValidate>["body"]

export type RegisterDto = z.infer<typeof RegisterDtoValidate>["body"]
