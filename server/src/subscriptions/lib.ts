import Stripe from "stripe";
import type { AttachSubscriptionPaymentMethod, CreateSubscriptionCheckout, CreateSubscriptionCustomer } from "./types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// TODO: error handling
// FIX: validate input (check for required fields and format)
export async function createSubscriptionCheckout(data: CreateSubscriptionCheckout) {
  const { stripeCustomerId, stripePriceId, stripePaymentId } = data;

  try {
    return await stripe.subscriptions.create({  
      customer: stripeCustomerId,
      items: [{ price: stripePriceId }],
      default_payment_method: stripePaymentId
    })

  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown"
    console.log(msg);
  }

}

// TODO: error handling
// TODO: handle rate limiting (429 errors)
// FIX: prevent duplicated user (check if Stripe customer already exists for user)
// FIX: validate input (check for required fields and format)
export function createSubscriptionCustomer(data: CreateSubscriptionCustomer) {
  const { uuid, name, email } = data;

  return stripe.customers.create({
    name,
    email, 
    metadata: { uuid }
  });
}

// TODO: error handling
// FIX: check if payment method is already attached to customer
export async function attachSubscriptionPaymentMethod(id: string, data: AttachSubscriptionPaymentMethod) {
  const { customerStripeId } = data;
  
  try {
    return await stripe.paymentMethods.attach(id, {
      customer: customerStripeId,
    })

  } catch (e) {
    console.error(e);
  }
}

// TODO: error handling
// TODO: filter only active subscription products
export function retrieveSubscriptionProducts() {
  return stripe.products.list();
}

