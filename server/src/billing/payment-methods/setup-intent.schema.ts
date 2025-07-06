import { createZodObject, z } from "../../common/lib/validator";

export const SetupIntentSchema = createZodObject({
  stripeCustomerId: z.string(),
});

export type SetupIntentDTO = z.infer<typeof SetupIntentSchema>;
