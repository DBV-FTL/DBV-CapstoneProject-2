import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import apiClient from "../../services/apiClient";
import "./Payment.css";

export default function Payment({}) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState();

  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  useEffect(() => {
    setStripePromise(loadStripe(publishableKey));
  }, []);

  useEffect(() => {
    async function fetchClientSecret() {
        const secret = await apiClient.fetchPaymentIntent()
        setClientSecret(secret.data)
    }
    fetchClientSecret()
  },[]);


  return (
    <div className="payment">
      <h4>Payment</h4>
      {stripePromise && clientSecret && (
      <Elements stripe={stripePromise} options={clientSecret}>
        <CheckoutForm />
      </Elements>
      )} 
    </div>
  );
}
