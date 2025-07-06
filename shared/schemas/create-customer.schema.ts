import { createZodObject, z } from "../../server/src/common/lib/validator";

export const CreateCustomerSchema = createZodObject({
  uuid: z.string(),
  name: z.string(),
  email: z.string(),
});

export type CreateCustomerDTO = z.infer<typeof CreateCustomerSchema>;
