import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, type FC } from "react";
import { Form, useNavigate } from "react-router";
type TCardSubscription = {
  clientSecret: string;
};
const CardSubscription: FC<TCardSubscription> = ({ clientSecret }) => {
  // Initialize an instance of stripe.
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [name, setName] = useState("Jenny Rosen");
  // helper for displaying status messages.
  //
  const [messages, _setMessages] = useState("");
  const setMessage = (message) => {
    _setMessages(`${messages}\n\n${message}`);
  };
  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return "";
  }
  // When the subscribe-form is submitted we do a few things:
  //
  //   1. Tokenize the payment method
  //   2. Create the subscription
  //   3. Handle any next actions like 3D Secure that are required for SCA.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use card Element to tokenize payment details
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name,
        },
      },
    });

    if (error) {
      // show error and collect new card details.
      setMessage(error.message);
      return;
    }
    navigate("/account", { replace: false });
  };
  return (
    <Form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <label className="block mb-4">
        <span className="text-gray-700 font-medium block mb-2">Full name</span>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <div className="mb-6">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-3 border border-gray-300 rounded-md"
        />
      </div>

      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Subscribe
      </button>

      {messages && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {messages}
        </div>
      )}
    </Form>
  );
};
export default CardSubscription;
