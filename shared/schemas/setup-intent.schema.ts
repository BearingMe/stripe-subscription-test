import { createZodObject, z } from "../../server/src/common/lib/validator";

export const SetupIntentSchema = createZodObject({
  stripeCustomerId: z.string(),
});

export type SetupIntentDTO = z.infer<typeof SetupIntentSchema>;
