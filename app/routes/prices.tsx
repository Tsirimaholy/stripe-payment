import React, { useState, useEffect } from "react";
import type { ActionFunctionArgs } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { Form, redirect } from "react-router";
import { useNavigation } from "react-router";
import { useLoaderData } from "react-router";
import { useLocation, useNavigate } from "react-router";
import { getPrices, createSubscription } from "~/api/payments";
import { commitSession, getSession } from "~/sessions";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const data = await request.formData();
  const priceId = data.get("priceId") as string;
  const customerId = session.get("customerId") as string;
  try {
    const { data: {client_secret} } = await createSubscription({
      customer_id: customerId,
      price_id: priceId,
    });
    return redirect(`/subscribe?client_secret=${client_secret}`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return { error };
  }
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const prices = await getPrices();
  return { prices: prices.data.prices, customerId: session.get("customerId") };
};
const Prices = () => {
  const { prices, customerId, error } = useLoaderData<typeof loader>();
  const location = useLocation();
  const isLoading =
    location.state === "loading" || location.state === "submitting";

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <pre>{JSON.stringify(error)}</pre>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Select a plan {customerId}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {prices.map((price) => (
            <div
              key={price.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  {price.product.name}
                </h3>

                <div className="mt-4 flex justify-center items-center">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${price.unit_amount / 100}
                  </span>
                  <span className="ml-2 text-xl font-medium text-gray-500">
                    /month
                  </span>
                </div>

                <div className="mt-8">
                  <Form id="subscribe-form" method="POST">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white rounded-md py-3 px-4 hover:bg-blue-700 transition-colors duration-200 ease-in-out font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      name="priceId"
                      value={price.id}
                    >
                      {isLoading ? "Loading..." : "Subscribe"}
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prices;
