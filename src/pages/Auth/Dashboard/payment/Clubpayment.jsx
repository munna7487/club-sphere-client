import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Useaxiossecuire from '../../../../hooks/Useaxiossecuire';

const Clubpayment = () => {
  const { id } = useParams();
  const axiosSecure = Useaxiossecuire();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await axiosSecure.get(`/clubs/${id}`);
        setClub(res.data);
      } catch (err) {
        console.error('Club fetch error:', err);
        toast.error('Failed to load club information');
      } finally {
        setLoading(false);
      }
    };
    fetchClub();
  }, [id, axiosSecure]);

  const handlePayment = async () => {
    if (!club?._id || !club?.membershipFee) {
      toast.error('Missing club information');
      return;
    }

    setProcessing(true);

    const paymentInfo = {
      _id: club._id,
      clubName: club.clubName,
      membershipFee: club.membershipFee,
      createremail: club.createremail,
    };

    try {

      const res = await axiosSecure.post(
        'https://club-sphere-server-flax.vercel.app/create-club-checkout-session',
        paymentInfo
      );
      console.log(res.data)
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('No payment URL received');
      }
    } catch (err) {
      console.error('Payment error:', err);
      toast.error(err?.response?.data?.error || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center text-error text-xl">
        Club not found
      </div>
    );
  }

  const isPaid = club.clubpayment === 'paid';

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center py-10 px-6">
          <h2 className="card-title text-3xl font-bold mb-6">Membership Payment</h2>
          <div className="text-6xl font-black text-primary mb-3">
            ${club.membershipFee || '—'}
          </div>
          <h3 className="text-2xl font-semibold mb-1">{club.clubName}</h3>
          <p className="text-base-content/70 mb-8">
            Annual membership fee • One-time payment
          </p>
          <div className="w-full max-w-xs space-y-4">
            {isPaid ? (
              <div className="alert alert-success shadow-lg">
                <span>Payment completed ✓ You are now a member</span>
              </div>
            ) : (
              <button
                onClick={handlePayment}
                disabled={processing}
                className="btn btn-primary btn-lg w-full"
              >
                {processing ? (
                  <>
                    <span className="loading loading-spinner"></span> Processing...
                  </>
                ) : (
                  'Pay Now with Stripe'
                )}
              </button>
            )}
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline btn-sm w-full"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clubpayment;