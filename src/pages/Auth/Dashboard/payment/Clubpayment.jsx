import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Useaxiossecuire from '../../../../hooks/Useaxiossecuire';


const ClubPaymentPage = () => {
  const { id } = useParams();
  const axiosSecure = Useaxiossecuire();

  const [fee, setFee] = useState(null);
  const [clubName, setClubName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubFee = async () => {
      try {
        const res = await axiosSecure.get(`/clubs/${id}`);
        setFee(res.data.membershipFee);
        setClubName(res.data.clubName || 'This Club');
      } catch (err) {
        console.error('Error fetching club fee:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClubFee();
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
        <div className="card-body items-center text-center py-12 px-8">
          <h2 className="card-title text-3xl md:text-4xl font-bold mb-8">
            Membership Fee
          </h2>

          <div className="text-6xl md:text-7xl font-black text-primary mb-4">
            ${fee || '—'}
          </div>

          <p className="text-xl md:text-2xl font-medium mb-2">
            {clubName}
          </p>

          <p className="text-base-content/70 text-lg mb-10">
            Annual membership fee
          </p>

          <div className="card-actions w-full max-w-xs">
            <button className="btn btn-primary btn-lg w-full">
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubPaymentPage;