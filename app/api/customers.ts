import type { AxiosError, AxiosResponse } from "axios";
import api from "./config";
import Stripe from "stripe";
import axios from "axios";
// Input type for creating a customer
export type CreateCustomerDTO = {
  email: string;
  name: string;
};

// Response type from the API
export type CustomerResponse = Stripe.Response<Stripe.ApiList<Stripe.Customer>>;

// Error type
export type CustomerError = {
  message: string;
  code?: string;
  status?: number;
};

/**
 * Creates a new customer
 * @param customer Customer information
 * @returns Promise with customer data
 * @throws CustomerError if the request fails
 */
export const createCustomer = async (
  customer: CreateCustomerDTO
): Promise<CustomerResponse> => {
  try {
    const response: AxiosResponse<CustomerResponse> = await api.post(
      "/api/billing/customers/",
      customer
    );

    return response.data;
  } catch (error: unknown) {
    if (!axios.isAxiosError(error)) {
      throw {
        message: "Unknown error",
      };
    }
    const stripeError: Stripe.StripeRawError = {
      type: error.response?.data?.type || "StripeError",
      message: error.response?.data?.message || "Failed to create customer",
      code: error.response?.data?.code,
      param: error.response?.data?.param,
      detail: error.response?.data?.detail,
      requestId: error.response?.data?.requestId,
      statusCode: error.response?.status,
    };
    throw stripeError;
  }
};
