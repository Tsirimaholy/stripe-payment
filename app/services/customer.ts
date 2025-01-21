// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Qbl21EsiuDlXcqv22U3BO3CqiAii19c6PsGUMzCaeudseKdHtoS2KHGe56Bueb0YduyBVpDxVfp7eo4sJvZMSzl00h37uaoro"
);

export async function createCustomer(email: string, name: string) {
  const customer = await stripe.customers.create({
    email: email,
    name: name,
  });
  return customer;
}
