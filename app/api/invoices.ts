import type { AxiosResponse } from "axios";
import api from "./config";
import axios from "axios";

export type InvoiceStatus =
  | 'draft'
  | 'open'
  | 'paid'
  | 'uncollectible'
  | 'void';

export interface TInvoice {
  /**
   * Stripe invoice ID (e.g., "in_1OeJu2SDD123456789")
   */
  id: string;

  /**
   * Stripe customer ID (e.g., "cus_PqrSTuvWXyz")
   */
  customer_id: string;

  /**
   * Amount in currency's smallest unit (e.g., $99.99 => 9999)
   * @example 9999
   */
  amount: number;

  /**
   * Three-letter ISO currency code
   * @example "USD"
   */
  currency: string;

  /**
   * Current status of the invoice
   */
  status: InvoiceStatus;

  /**
   * ISO 8601 formatted date string
   * @example "2023-10-15T12:34:56+00:00"
   */
  date: string;

  /**
   * URL to download the PDF version of the invoice
   * @format url
   * @example "https://pay.stripe.com/invoice/acct_123/..."
   */
  invoice_pdf: string;

  /**
   * Optional description of the invoice
   */
  description?: string;
}

type InvoicesResponse = {
success: boolean;
data: TInvoice[];
}
export type ErrorResponse = {
  error: string;
};
export const listInvoices = async (
): Promise<InvoicesResponse> => {
  try {
    const response: AxiosResponse<InvoicesResponse> = await api.get(
      `/api/billing/my-invoices/`
    );

    return response.data;
  } catch (error: unknown) {
    console.log({error})
    console.log({data: error.data})
    if (axios.isAxiosError(error) && error.response) {
      throw {
        error: error.response.data.errors || "Failed to fetch invoices",
      } as ErrorResponse;
    }
    throw {
      error: "An unknown error occurred",
    } as ErrorResponse;
  }
};
