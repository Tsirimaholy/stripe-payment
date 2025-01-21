import type { AxiosResponse } from 'axios';
import api from "./config";

// Input type for creating a customer
export type CreateCustomerDTO = {
  email: string;
  name: string;
};

// Response type from the API
export type CustomerResponse = {
  id: string;
  email: string;
  name: string;
  created: number;
};

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
  } catch (error: any) {
    const customerError: CustomerError = {
      message: error.response?.data?.message || 'Failed to create customer',
      code: error.response?.data?.code,
      status: error.response?.status
    };

    throw customerError;
  }
};
