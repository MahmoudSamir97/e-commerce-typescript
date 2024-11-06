import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email address is required." }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

type loginTypes = z.infer<typeof loginSchema>;

export { loginSchema, type loginTypes };
