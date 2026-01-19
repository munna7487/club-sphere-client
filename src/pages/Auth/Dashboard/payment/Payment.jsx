import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Useaxiossecuire from '../../../../hooks/Useaxiossecuire';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_XXXX');

const CheckoutForm = ({ club }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiossecure = Useaxiossecuire();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (!club?.membershipFee) {
      alert("Membership fee missing");
      return;
    }

    const paymentInfo = {
      _id: club._id,
      clubName: club.clubName,
      membershipFee: club.membershipFee,
      createremail: club.createremail,
    };

    const res = await axiossecure.post(
      '/create-checkout-session',
      paymentInfo
    );

    window.location.href = res.data.url;
  };

  return (
    <form onSubmit={handlePayment} className="max-w-md mx-auto p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">{club.clubName}</h2>
      <p className="mb-4">Fee: ${club.membershipFee}</p>

      <label className="block mb-2 font-medium">Card Details</label>
      <div className="p-3 mb-4 border rounded">
        <CardElement />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-lg"
      >
        Pay Now
      </button>
    </form>
  );
};

const Payment = () => {
  // 🔥🔥🔥 FIX IS HERE
  const { id } = useParams(); // ❌ _id → ✅ id
  const axiossecure = Useaxiossecuire();

  const { data: club = {}, isLoading } = useQuery({
    queryKey: ['club', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiossecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm club={club} />
    </Elements>
  );
};

export default Payment;
