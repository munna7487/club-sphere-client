import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../../hooks/UseAuth';
import Useaxiossecuire from '../../../../hooks/Useaxiossecuire';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Myclub = () => {
  const { user } = UseAuth();
  const axiossecure = Useaxiossecuire();

  const { data: clubs = [], isLoading, refetch } = useQuery({
    queryKey: ['myclub', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiossecure.get(`/clubs?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiossecure.delete(`/clubs/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', '', 'success');
          refetch();
        }
      }
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Clubs ({clubs.length})</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={club.bannerUrl} className="h-48 w-full object-cover" />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold">{club.clubName}</h3>
              <p className="text-sm text-gray-500">{club.description.slice(0, 80)}...</p>
              <div className="flex justify-between text-sm">
                <span>📍 {club.location}</span>
                <span>💼 {club.category}</span>
              </div>
              <p className="font-medium text-indigo-600">Fee: ${club.membershipFee}</p>

              <Link
                to={`/dashboard/payment/${club._id}`}
                className={`w-full py-2 rounded-lg mt-2 text-center block
                  ${club.paymentStatus === 'paid'
                    ? 'bg-green-500 text-white pointer-events-none'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'}
                `}
              >
                {club.paymentStatus === 'paid' ? 'Paid' : 'Pay'}
              </Link>

              <button
                onClick={() => handleDelete(club._id)}
                className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg"
              >
                Delete Club
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myclub;
