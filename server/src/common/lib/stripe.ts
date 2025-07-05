import { loadRequiredEnvVariable } from "../utils/env";
import Stripe from "stripe";

const secretKey = loadRequiredEnvVariable("STRIPE_SECRET_KEY");
const stripe = new Stripe(secretKey);

export { stripe };