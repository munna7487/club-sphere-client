import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Useaxiossecuire from '../../../../hooks/Useaxiossecuire';
import { toast } from 'react-hot-toast';

const ClubPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = Useaxiossecuire();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      console.log('Confirming payment with session ID:', sessionId);
      axiosSecure
        .patch(`https://club-sphere-server-flax.vercel.app/club-payment-success?session_id=${sessionId}`)
        .then(() => {
          toast.success('Payment successful! You are now a member.');
          navigate('/club');
        })
        .catch((err) => {
          console.error('Payment confirmation error:', err);
          toast.error('Payment confirmation failed');
          navigate('/club');
        });
    } else {
      toast.error('No payment session found');
      navigate('/club');
    }
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-success mb-4">
          Payment Successful!
        </h2>
        <p className="text-lg">Redirecting...</p>
      </div>
    </div>
  );
};

export default ClubPaymentSuccess;