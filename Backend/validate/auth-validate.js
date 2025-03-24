import {z} from "zod"

export const loginSchema=z.object({
     email:z.string({required_error:"email is required"}).trim().email({message:"Invalid email"}).min(3,{message:"email must be atleast 3 character"}).max(255,{messgae:"email must not more than 255 character"}),
     password:z.string({required_error:"password is required"}).trim().min(3,{message:"password must be atleast 3 character"}).max(255,{message:"password must not more than 255 character"}),
});

export const signupSchema=loginSchema.extend({
    username:z.string({required_error:"username is required"}).trim().min(3,{message:"name must be atleast 3 character"}).max(255,{message:"name must not more than 255 character"}),
})

export default {loginSchema,signupSchema};