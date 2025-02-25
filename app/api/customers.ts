import type { AxiosError, AxiosResponse } from "axios";
import api from "./config";
import Stripe from "stripe";
import axios from "axios";
// Input type for creating a customer
export type CreateCustomerDTO = {
  email: string;
};

// Response type from the API
export type TCustomerResponse = Stripe.Response<Stripe.Customer>;
export type CustomerResponse = {
  data: {customer_id: string}
  status: boolean;
};

// Error type
export type CustomerError = {
  message: string;
  code?: string;
  status?: number;
};

// Define the error response
export type ErrorResponse = {
  error: string;
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
    if (axios.isAxiosError(error) && error.response) {
      console.log({error})
      throw {
        error: error.response.data.errors || "Failed to fetch customers",
      } as ErrorResponse;
    }
    console.log({error})
    throw {
      error: "An unknown error occurred",
    } as ErrorResponse;
  }
};
