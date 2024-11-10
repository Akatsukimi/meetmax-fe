import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Contain at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  username: z
    .string()
    .min(3, { message: "Be at least 3 characters long." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Only letters and numbers are allowed.",
    })
    .trim(),
  birthday: z.string(),
  gender: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const createPostSchema = z.object({
  content: z.string().min(1, { message: "Post content is required" }).trim(),
  visibility: z.string().optional(),
  fileIds: z.array(z.string()).optional(),
});
