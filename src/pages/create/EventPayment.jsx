import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";

const EventPayment = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/event-registration-status`, {
          params: { eventId: id, email: user.email },
        })
        .then((res) => setAlreadyRegistered(res.data.registered))
        .catch((err) => console.error(err));
    }
  }, [id, user]);

  if (alreadyRegistered) {
    return (
      <div className="text-center mt-20 text-red-600 text-2xl font-bold">
        ✅ You are already registered for this event
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/create-event-payment`, {
        eventId: id,
        email: user.email,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert("❌ Payment URL not found");
      }
    } catch (error) {
      console.error("❌ Payment error:", error);
      alert("Payment failed");
    }
  };

  return (
    <div className="text-center mt-20">
      <button onClick={handlePayment} className="btn btn-primary">
        Register & Pay
      </button>
    </div>
  );
};

export default EventPayment;
