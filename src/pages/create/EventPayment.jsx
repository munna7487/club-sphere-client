import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import UseAuth from "../../hooks/UseAuth";
import Useaxiossecuire from "../../hooks/Useaxiossecuire";

const EventPayment = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const axiosSecure = Useaxiossecuire();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Event details লোড করা
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axiosSecure.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, axiosSecure]);

  // Already registered কিনা চেক করা
  useEffect(() => {
    if (!user?.email || !id) return;

    const checkRegistration = async () => {
      try {
        const res = await axiosSecure.get("/event-registration-status", {
          params: { eventId: id, email: user.email },
        });
        setAlreadyRegistered(res.data.registered);
      } catch (err) {
        console.error(err);
      }
    };
    checkRegistration();
  }, [id, user?.email, axiosSecure]);

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (alreadyRegistered) {
      toast("You are already registered for this event", { icon: "ℹ️" });
      return;
    }

    setProcessing(true);

    try {
      // Free event registration
      if (event?.eventType?.toLowerCase() === "free") {
        const res = await axiosSecure.post("/event-register-free", {
          eventId: id,
        });

        if (res.data.success) {
          toast.success("Successfully registered for free event!");
          setAlreadyRegistered(true);
          // অপশনাল: event details আবার লোড করা যাতে attendees আপডেট দেখায়
          const updatedEvent = await axiosSecure.get(`/events/${id}`);
          setEvent(updatedEvent.data);
        }
        return;
      }

      // Paid event registration
      if (!event?.price || event.price <= 0) {
        toast.error("Invalid event price");
        return;
      }

      const res = await axiosSecure.post("/create-event-payment", {
        eventId: id,
        email: user.email,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("No payment URL received from server");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Operation failed");
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

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-error text-xl">
        Event not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center py-10 px-6">
          <h2 className="card-title text-3xl font-bold mb-6">Event Registration</h2>

          <div className="text-5xl font-black text-primary mb-4">
            {event.eventType?.toLowerCase() === "free" ? "FREE" : `$${event.price}`}
          </div>

          <h3 className="text-2xl font-semibold mb-1">{event.title}</h3>
          <p className="text-base-content/70 mb-8">
            {event.clubName ? `${event.clubName} • ` : ""}
            {event.eventType || "Event"}
          </p>

          {alreadyRegistered ? (
            <div className="alert alert-success shadow-lg w-full max-w-xs">
              <span>✅ You are already registered for this event</span>
            </div>
          ) : (
            <button
              onClick={handlePayment}
              disabled={processing || !user}
              className="btn btn-primary btn-lg w-full max-w-xs"
            >
              {processing ? (
                <>
                  <span className="loading loading-spinner"></span> Processing...
                </>
              ) : event.eventType?.toLowerCase() === "free" ? (
                "Register for Free"
              ) : (
                "Pay & Register"
              )}
            </button>
          )}

          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-sm w-full max-w-xs mt-3"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPayment;