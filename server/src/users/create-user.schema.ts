import { createZodObject, z } from "../common/lib/validator";

export const CreateUserSchema = createZodObject({
  uuid: z.string(),
  name: z.string(),
  email: z.string(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
