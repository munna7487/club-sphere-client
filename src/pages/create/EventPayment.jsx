import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Useaxiossecuire from '../../hooks/Useaxiossecuire'; // তোমার secure axios hook
import UseAuth from '../../hooks/UseAuth'; // যদি user email লাগে (optional)

const EventPayment = () => {
  const { id } = useParams(); // এটা EVENT ID
  const axiosSecure = Useaxiossecuire();
  const navigate = useNavigate();
  const { user } = UseAuth(); // optional: logged in user email

  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchEventAndCheck = async () => {
      try {
        // ১. Event details fetch
        const eventRes = await axiosSecure.get(`/events/${id}`);
        setEvent(eventRes.data);

        // ২. Already registered কি না চেক (optional, UX ভালো করার জন্য)
        const regRes = await axiosSecure.get(`/event-register/check?eventId=${id}`); // যদি backend-এ এই route না থাকে, নিচে ব্যাখ্যা আছে
        setIsRegistered(regRes.data?.isRegistered || false);

      } catch (err) {
        console.error('Event fetch error:', err);
        toast.error('Failed to load event information');
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndCheck();
  }, [id, axiosSecure]);

  const handlePayment = async () => {
    if (isRegistered) {
      toast.error('You are already registered for this event');
      return;
    }

    if (!event?._id || !event?.price || event.eventType?.toLowerCase() === 'free') {
      toast.error('Invalid event or free event — no payment needed');
      return;
    }

    setProcessing(true);

    const paymentInfo = {
      eventId: id,
      email: user?.email || 'guest@example.com', // backend token থেকে নেবে, তাই dummy দিলেও চলবে
    };

    try {
      const res = await axiosSecure.post('/create-event-payment', paymentInfo);
      console.log('Payment session response:', res.data);

      if (res.data?.url) {
        window.location.href = res.data.url; // Stripe checkout-এ redirect
      } else {
        toast.error('No payment URL received from server');
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
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-error text-xl font-bold">
        Event not found
      </div>
    );
  }

  const isFree = event.eventType?.toLowerCase() === 'free';
  const spotsLeft = Number(event.maxAttendees || 9999) - Number(event.attendees || 0);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
        <div className="card-body items-center text-center py-12 px-8">
          <h2 className="card-title text-4xl font-bold mb-6 text-primary">
            {event.title}
          </h2>

          <div className="stats shadow w-full mb-8">
            <div className="stat place-items-center">
              <div className="stat-title">Price</div>
              <div className="stat-value text-success">
                {isFree ? 'FREE' : `$${event.price}`}
              </div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Spots Left</div>
              <div className="stat-value text-info">{spotsLeft}</div>
            </div>
          </div>

          <p className="text-lg mb-8 text-base-content/80">
            Organized by: <span className="font-semibold">{event.clubName || 'Unknown Club'}</span>
          </p>

          {isRegistered ? (
            <div className="alert alert-success shadow-lg w-full max-w-md">
              <span>You are already registered ✓</span>
            </div>
          ) : spotsLeft <= 0 && !isFree ? (
            <div className="alert alert-error shadow-lg w-full max-w-md">
              <span>Event is full — no spots left</span>
            </div>
          ) : (
            <button
              onClick={handlePayment}
              disabled={processing || isFree}
              className={`btn btn-lg w-full max-w-md ${
                isFree
                  ? 'btn-disabled'
                  : 'btn-primary'
              }`}
            >
              {processing ? (
                <>
                  <span className="loading loading-spinner"></span> Processing...
                </>
              ) : isFree ? (
                'Free Event — Register Directly'
              ) : (
                `Pay $${event.price} & Register`
              )}
            </button>
          )}

          {/* Free event-এর জন্য আলাদা button (যদি চাও) */}
          {isFree && !isRegistered && (
            <button
              onClick={() => navigate(`/event-register-free/${id}`)} // অথবা backend free register route call
              className="btn btn-success btn-lg w-full max-w-md mt-4"
            >
              Register for Free
            </button>
          )}

          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-sm mt-6"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPayment;