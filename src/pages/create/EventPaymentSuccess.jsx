import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const EventPaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) return;
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/event-payment-success?session_id=${sessionId}`
        );
        console.log("Payment success response:", res.data);
      } catch (err) {
        console.error("Payment success error:", err);
      }
    };
    confirmPayment();
  }, [sessionId]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold text-green-600">
        Event Registered Successfully 🎉
      </h2>

      <Link to="/show-event">
        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded">
          Back to Events
        </button>
      </Link>
    </div>
  );
};

export default EventPaymentSuccess;
