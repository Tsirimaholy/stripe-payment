import {stripeClient as stripe} from "./stripeClient"

export const getConfig = async () => {
  const prices = await stripe.prices.list({ expand: ["data.product"] });
  return { prices };
};
export const subscribe = async (customerId: string, priceId: string) => {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice.payment_intent"],
  });
  return {subscription, clientSecret: subscription.latest_invoice?.payment_intent.client_secret};
};
export const listSubscriptions = async (customerId: string) => {
  return await stripe.subscriptions.list({ customer: customerId });
};
