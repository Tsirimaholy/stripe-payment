import React, { useState, useEffect } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { Link, useActionData, useLoaderData } from "react-router";
import { listSubscriptions } from "~/services/payment";
import { getSession } from "~/sessions";
import {action} from "~/routes/webhook"
const AccountSubscription = ({ subscription }) => {
  return (
    <section className="border rounded-lg p-6 mb-4 bg-white shadow-sm">
      <h4 className="text-lg font-semibold mb-4">
        <a
          href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {subscription.id}
        </a>
      </h4>

      <div className="space-y-2">
        <p className="flex items-center">
          <span className="text-gray-600 mr-2">Status:</span>
          <span className={`font-medium ${
            subscription.status === 'active'
              ? 'text-green-600'
              : 'text-yellow-600'
          }`}>
            {subscription.status}
          </span>
        </p>

        <p className="flex items-center">
          <span className="text-gray-600 mr-2">Card last4:</span>
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            {subscription.default_payment_method?.card?.last4}
          </span>
        </p>

        <p className="flex items-center">
          <span className="text-gray-600 mr-2">Current period end:</span>
          <span className="text-gray-800">
            {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
          </span>
        </p>

        <div className="mt-4 pt-4 border-t">
          <Link
            to={"/cancel"}
            state={{ subscription: subscription.id }}
            className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancel Subscription
          </Link>
        </div>
      </div>
    </section>
  );
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const customerId = session.get("customerId") as string;
  const subscriptions = await listSubscriptions(customerId);
  return { subscriptions };
};

const Account = () => {
  const { subscriptions } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();


  if (!subscriptions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account {actionData?.data}</h1>

        <div className="space-x-4">
          <a
            href="/prices"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add a subscription
          </a>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Restart demo
          </a>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Subscriptions
        </h2>

        <div className="space-y-4">
          {subscriptions.data.map((subscription) => (
            <AccountSubscription
              key={subscription.id}
              subscription={subscription}
            />
          ))}

          {subscriptions.data.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No subscriptions found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
