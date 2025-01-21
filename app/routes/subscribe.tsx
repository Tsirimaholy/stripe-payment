import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { redirect, useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import CardSubscription from "~/components/cardsubscription";
import type { LoaderFunctionArgs } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { commitSession, getSession } from "~/sessions";
import { subscribe } from "~/services/payment";
import { useLoaderData } from "react-router";
const stripePromise = loadStripe(
  "pk_test_51Qbl21EsiuDlXcqvpCuoaD8nhlqzG652i8UFCih0swymvhgDZKkvd02znheeJDKFloCRP2ecvW8vlJH9CpPwqJOR00BaXU2SXH"
);

export const action = async ({ request }: ActionFunctionArgs) => {};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const client_secret = url.searchParams.get("client_secret");
  return {
    client_secret,
  };
};
const Subscribe = () => {
  const { client_secret } = useLoaderData<typeof loader>();
  if (!client_secret) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-700">
          ...Loading stripe
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Subscribe
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <p className="mb-3">
          Try the successful test card:{" "}
          <span className="font-mono bg-gray-200 px-2 py-1 rounded">
            4242424242424242
          </span>
        </p>

        <p className="mb-3">
          Try the test card that requires SCA:{" "}
          <span className="font-mono bg-gray-200 px-2 py-1 rounded">
            4000002500003155
          </span>
        </p>

        <p className="text-gray-600 italic">
          Use any <i>future</i> expiry date, CVC, 5 digit postal code
        </p>
      </div>

      <hr className="my-8 border-gray-200" />

      <Elements stripe={stripePromise}>
        <CardSubscription clientSecret={client_secret} />
      </Elements>
    </div>
  );
};

export default Subscribe;
