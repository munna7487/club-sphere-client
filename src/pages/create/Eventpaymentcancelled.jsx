import React from "react";
import { useSearchParams, Link } from "react-router-dom";

const EventPaymentCancelled = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId") || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center py-10 px-6">
          <h2 className="text-3xl font-bold text-error mb-6">
            Payment Cancelled
          </h2>
          <div className="text-6xl mb-6">😕</div>
          <p className="text-lg mb-8">No charges were made. You can try again.</p>

          <div className="w-full max-w-xs space-y-4">
            {eventId && (
              <Link
                to={`/event-payment/${eventId}`}
                className="btn btn-primary w-full"
              >
                Try Again
              </Link>
            )}
            <Link to="/show-event" className="btn btn-outline w-full">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPaymentCancelled;