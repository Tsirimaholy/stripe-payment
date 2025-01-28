import type { AxiosResponse } from "axios";
import api from "./config";
import Stripe from "stripe";
import axios from "axios";

// Define the response type using Stripe types
export type TPricesResponse = Stripe.ApiList<Stripe.Price>;
export type PricesResponse = {
  success: boolean;
  data: TPricesResponse;
};
// Define the error response
export type ErrorResponse = {
  error: string;
};

/**
 * Fetches prices from the `/api/billing/prices/` endpoint
 * @returns Promise with the list of prices
 * @throws ErrorResponse if the request fails
 */
export const getPrices = async (): Promise<PricesResponse> => {
  try {
    const response: AxiosResponse<PricesResponse> = await api.get(
      "/api/billing/prices/"
    );
    return response.data;
  } catch (error: unknown) {
    console.log({error})
    if (axios.isAxiosError(error) && error.response) {
      throw {
        error: error.response.data.errors || "Failed to fetch prices",
      } as ErrorResponse;
    }
    throw {
      error: "An unknown error occurred",
    } as ErrorResponse;
  }
};

// Input type for subscription
export type CreateSubscriptionDTO = {
  customer_id: string;
  price_id: string;
};

// Response type for subscription
export type TSubscriptionResponse = {
  subscription: Stripe.Subscription;
  client_secret: string;
};

export type SubscriptionResponse = {
  success: boolean;
  data: TSubscriptionResponse;
};


/**
 * Creates a new subscription
 * @param data Object containing customer_id and price_id
 * @returns Promise with subscription data and client secret
 * @throws ErrorResponse if the request fails
 */
export const createSubscription = async (
  data: CreateSubscriptionDTO
): Promise<SubscriptionResponse> => {
  try {
    const response: AxiosResponse<SubscriptionResponse> = await api.post(
      "/api/billing/subscribe/",
      data
    );

    return response.data;
  } catch (error: unknown) {
    console.log({error})
    if (axios.isAxiosError(error) && error.response) {
      throw {
        error: error.response.data.errors || "Failed to create subscription",
      } as ErrorResponse;
    }
    throw {
      error: "An unknown error occurred",
    } as ErrorResponse;
  }
};

// Response type for list of subscriptions
export type SubscriptionsResponse = Stripe.ApiList<Stripe.Subscription>;

/**
 * Fetches subscriptions for a given customer ID
 * @param customerId The ID of the customer
 * @returns Promise with the list of subscriptions
 * @throws ErrorResponse if the request fails
 */
export const listSubscriptions = async (
  customerId: string
): Promise<SubscriptionsResponse> => {
  try {
    const response: AxiosResponse<SubscriptionsResponse> = await api.get(
      `/api/billing/subscriptions/${customerId}/`
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw {
        error: error.response.data.errors || "Failed to fetch subscriptions",
      } as ErrorResponse;
    }
    throw {
      error: "An unknown error occurred",
    } as ErrorResponse;
  }
};
