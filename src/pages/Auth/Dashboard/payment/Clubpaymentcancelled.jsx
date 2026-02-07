import React from 'react';
import { useNavigate } from 'react-router-dom';

const Clubpaymentcancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center py-10 px-6">
          <h2 className="text-3xl font-bold text-error mb-6">
            Payment Cancelled
          </h2>
          <div className="text-6xl mb-4">❌</div>
          <p className="text-lg text-base-content/80 mb-8">
            Your payment was cancelled. No charges were made.
          </p>
          <div className="space-y-4 w-full">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-primary btn-lg w-full"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/club')}
              className="btn btn-outline btn-lg w-full"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clubpaymentcancelled;