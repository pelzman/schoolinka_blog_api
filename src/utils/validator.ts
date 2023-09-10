import z from "zod"

export const validateBlogSchema = z.object({
    title: z.string({required_error: "title is required"}),
    content: z.string({required_error: "content cannot be  empty"}),
    author:z.string({required_error: "author is required"}),
   
})
export const validateUserSchema = z.object({
    firstname: z.string({required_error: "firstname is required"}),
    lastname: z.string({required_error: "lastname is required"}),
    email:z.string({required_error: "email is required"}).email({message:'mail is invalid'}),
    password:z.string({required_error: "password is required"}).min(6),   
   
})