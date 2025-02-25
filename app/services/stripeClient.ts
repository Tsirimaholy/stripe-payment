import Stripe from "stripe";

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
export const stripeClient = new Stripe(
  "sk_test_51Qbl21EsiuDlXcqv22U3BO3CqiAii19c6PsGUMzCaeudseKdHtoS2KHGe56Bueb0YduyBVpDxVfp7eo4sJvZMSzl00h37uaoro"
);
