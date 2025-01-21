// Set your secret key. Remember to switch to your live secret key in production.

import { data, type LoaderFunctionArgs } from "react-router";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Qbl21EsiuDlXcqv22U3BO3CqiAii19c6PsGUMzCaeudseKdHtoS2KHGe56Bueb0YduyBVpDxVfp7eo4sJvZMSzl00h37uaoro"
);
export const action = async ({ request }: LoaderFunctionArgs) => {
  // Retrieve the event by verifying the signature using the raw body and secret.
  let event;
  const body = await request.text();
  const stripeSignature = request.headers.get("stripe-signature") as string;
  const webhookSecret =
    "whsec_5c7d22b0b03ca8cb9eacd9a1f057808b82452aa00f87d8083c81061ec48f1ef6";
  if (!stripeSignature || !webhookSecret) {
    console.error("Missing Stripe signature or webhook secret.");
    return data({ error: "Webhook configuration error." }, { status: 400 });
  }
  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      webhookSecret
    );
  } catch (err) {
    console.log(err);
    console.log(`⚠️  Webhook signature verification failed.`);
    console.log(`⚠️  Check the env file and enter the correct webhook secret.`);
    return Response.json(null, { status: 400 });
  }
  // Extract the object from the event.
  const dataObject = event.data.object;

  // Handle the event
  // Review important events for Billing webhooks
  // https://stripe.com/docs/billing/webhooks
  // Remove comment to see the various objects sent for this sample
  switch (event.type) {
    case "invoice.paid":
      // Used to provision services after the trial has ended.
      // The status of the invoice will show up as paid. Store the status in your
      // database to reference when a user accesses your service to avoid hitting rate limits.
      break;
    case "invoice.payment_failed":
      // If the payment fails or the customer does not have a valid payment method,
      //  an invoice.payment_failed event is sent, the subscription becomes past_due.
      // Use this webhook to notify your user that their payment has
      // failed and to retrieve new card details.
      break;
    case "customer.subscription.deleted":
      if (event.request != null) {
        // handle a subscription canceled by your request
        // from above.
      } else {
        // handle subscription canceled automatically based
        // upon your subscription settings.
      }
      break;
    default:
    // Unexpected event type
  }
  return Response.json({"data": "webhook"}, {status: 200})
};
