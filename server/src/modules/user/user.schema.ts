import { object, string, TypeOf } from 'zod';

export const registerUserSchema = {
    body: object({
        username: string({
            required_error: "username is required"
        }),
        email: string({
            required_error: "email is required"
        }).email("Not a valid email"),
        password: string({
            required_error: "password is required"
        }).min(6, "Password must be at least 6 characters long"),
        confirmPassword: string({
            required_error: "username is required"
        }),
    }).refine( (data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    }),
}

export type RegisterUserSchema = TypeOf<typeof registerUserSchema.body>