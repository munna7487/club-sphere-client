import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Useaxiossecuire from "../../../../hooks/Useaxiossecuire";
import { toast } from "react-hot-toast";

const ClubPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = Useaxiossecuire();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      toast.error("No session ID found");
      return;
    }

    const confirmPayment = async () => {
      try {
        const res = await axiosSecure.patch(`/club-payment-success?session_id=${sessionId}`);
        if (res.data?.success) {
          setStatus('success');
          toast.success("Payment successful! Welcome to the club!");
        } else {
          setStatus('error');
          toast.error("Payment confirmation failed");
        }
      } catch (err) {
        console.error("Confirmation error:", err);
        setStatus('error');
        toast.error(err?.response?.data?.error || "Something went wrong");
      }
    };

    confirmPayment();
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
        <div className="card-body items-center text-center py-12 px-8">
          {status === 'loading' && (
            <>
              <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
              <h2 className="text-2xl font-bold">Confirming your payment...</h2>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mb-6">
                <span className="text-6xl">✓</span>
              </div>
              <h2 className="text-3xl font-bold text-success mb-4">
                Payment Successful!
              </h2>
              <p className="text-lg mb-8">
                Thank you for joining the club. Your membership is now active.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Link
                  to="/dashboard/my-clubs"
                  className="btn btn-primary btn-lg"
                >
                  Go to My Clubs
                </Link> */}
                <button
                  onClick={() => navigate(-2)} // go back to club page
                  className="btn btn-outline btn-lg"
                >
                  Back to Club
                </button>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-24 h-24 rounded-full bg-error/20 flex items-center justify-center mb-6">
                <span className="text-6xl">×</span>
              </div>
              <h2 className="text-3xl font-bold text-error mb-4">
                Something went wrong
              </h2>
              <p className="text-lg mb-8">
                We couldn't confirm your payment. Please contact support if the amount was deducted.
              </p>
              <Link to="/" className="btn btn-error btn-lg">
                Go to Home
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubPaymentSuccess;