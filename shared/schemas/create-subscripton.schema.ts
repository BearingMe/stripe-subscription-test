import { createZodObject, z } from "../../server/src/common/lib/validator";

export const CreateStripeSubscriptionSchema = createZodObject({
  stripeCustomerId: z.string(),
  stripePaymentMethodId: z.string(),
  stripePriceId: z.string(),
});

export type CreateSubscriptionDTO = z.infer<typeof CreateStripeSubscriptionSchema>;
