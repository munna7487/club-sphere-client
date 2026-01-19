import React from "react";
import { Link } from "react-router-dom";

const Paymentcancelled = () => {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Payment cancelled. Please try again
      </h2>

      <Link to="/dashboard/my-club">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded">
          Go Back
        </button>
      </Link>
    </div>
  );
};

export default Paymentcancelled;