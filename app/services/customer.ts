import {stripeClient as stripe} from "./stripeClient"

export async function createCustomer(email: string, name: string) {
  const customer = await stripe.customers.create({
    email: email,
    name: name,
  });
  return customer;
}
