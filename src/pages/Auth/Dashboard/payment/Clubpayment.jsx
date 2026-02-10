import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Useaxiossecuire from '../../../../hooks/Useaxiossecuire'; // adjust path

const Clubpayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = Useaxiossecuire();

  const [club, setClub] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clubRes, memberRes] = await Promise.all([
          axiosSecure.get(`/clubs/${id}`),
          axiosSecure.get(`/clubs/${id}/is-member`)
        ]);

        setClub(clubRes.data);
        setIsMember(memberRes.data.isMember || false);

        // If already member → redirect back
        if (memberRes.data.isMember) {
          toast.success('You are already a member of this club');
          navigate(`/club/${id}`);
        }
      } catch (err) {
        console.error('Error:', err);
        toast.error('Failed to load club information');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axiosSecure, navigate]);

  const handlePayment = async () => {
    if (!club?._id || !club?.membershipFee) {
      toast.error('Missing club information');
      return;
    }

    if (isMember) {
      toast.info('You are already a member');
      return;
    }

    setProcessing(true);

    const paymentInfo = {
      _id: club._id,
      clubName: club.clubName,
      membershipFee: club.membershipFee
      // Note: We do NOT send createremail anymore — backend gets user from token
    };

    try {
      const res = await axiosSecure.post(
        '/create-club-checkout-session',
        paymentInfo
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('No payment URL received');
      }
    } catch (err) {
      console.error('Payment initiation error:', err);
      toast.error(err?.response?.data?.error || 'Failed to start payment');
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
            {isMember ? (
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