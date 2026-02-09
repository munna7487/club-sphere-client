import { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Useaxiossecuire from "../../hooks/Useaxiossecuire";
import { toast } from "react-hot-toast";
import UseAuth from "../../hooks/UseAuth";

const EventPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = Useaxiossecuire();
  const navigate = useNavigate();
  const { user, loading: authLoading, logout } = UseAuth(); 

  const sessionId = searchParams.get("session_id");
  const eventId = searchParams.get("eventId");

  useEffect(() => {
    if (authLoading) return; 

    console.log("[SUCCESS PAGE] User status:", user ? user.email : "NO USER");

    const confirmPayment = async () => {
      if (!sessionId) {
        toast.error("No payment session found");
        navigate("/show-event");
        return;
      }

      if (!user) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      try {
        console.log("[SUCCESS PAGE] Sending confirmation request...");
        const res = await axiosSecure.patch(`/event-payment-success?session_id=${sessionId}`);

        console.log("[SUCCESS PAGE] Server response:", res.data);

        if (res.data.success) {
          toast.success("Payment & registration successful! 🎉");
          if (eventId) {
            navigate(`/event/${eventId}`); // event page-এ যাও → data refresh হবে
          } else {
            navigate("/show-event");
          }
        }
      } catch (err) {
        console.error("[SUCCESS PAGE] Confirmation error:", err);

        
        if (err.response?.status === 401 || err.response?.status === 403) {
          toast.error("Authentication issue. Please try logging in again.");
     
          navigate("/login");
        } else {
          toast.error("Failed to confirm payment. Please contact support.");
        }
        navigate("/show-event");
      }
    };

    confirmPayment();
  }, [sessionId, eventId, axiosSecure, navigate, user, authLoading]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Verifying session...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center py-10">
          <h2 className="text-3xl font-bold text-success mb-4">
            {user ? "Payment Confirmed!" : "Checking Session..."}
          </h2>
          <p className="text-lg mb-6">Redirecting...</p>
        </div>
      </div>
    </div>
  );
};

export default EventPaymentSuccess;