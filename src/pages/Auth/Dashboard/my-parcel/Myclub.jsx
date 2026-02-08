import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../../hooks/UseAuth';
import Useaxiossecuire from '../../../../hooks/Useaxiossecuire';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Myclub = () => {
  const { user } = UseAuth();
  const axiossecure = Useaxiossecuire();
  const queryClient = useQueryClient();

  const { data: clubs = [], isLoading } = useQuery({
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
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiossecure.delete(`/clubs/${id}`);
          if (res.data?.deletedCount > 0 || res.data?.success) {
            Swal.fire('Deleted!', 'Club deleted successfully.', 'success', { timer: 1800 });
            queryClient.invalidateQueries({ queryKey: ['myclub', user?.email] });
          } else {
            Swal.fire('Failed', 'Could not delete club', 'error');
          }
        } catch (error) {
          Swal.fire('Error', error?.response?.data?.message || 'Something went wrong', 'error');
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Clubs</h1>
            <p className="mt-2 text-gray-600">Manage your created clubs & memberships</p>
          </div>
          <Link
            to="/create"
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl shadow-md transition-all font-medium"
          >
            + Create New Club
          </Link>
        </div>

        {/* Count */}
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Your Clubs <span className="text-indigo-600">({clubs.length})</span>
        </h2>

        {clubs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <p className="text-xl text-gray-600 mb-6">You haven't created any clubs yet.</p>
            <Link
              to="/create"
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl"
            >
              Create Your First Club
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
            {clubs.map((club) => (
              <div
                key={club._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 max-w-[380px] mx-auto w-full"
              >
                {/* Image - fixed aspect ratio */}
                <div className="relative pb-[56.25%] overflow-hidden bg-gray-100">
                  <img
                    src={club.bannerUrl || 'https://via.placeholder.com/600x338?text=Club+Banner'}
                    alt={club.clubName}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[2.8rem]">
                    {club.clubName}
                  </h3>

                  <p className="text-sm text-gray-600 mb-5 line-clamp-3 flex-grow">
                    {club.description || 'No description provided.'}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="text-lg font-semibold text-indigo-700">
                      Fee: ${club.membershipFee || 0}
                    </div>

                    <Link
                      to={`/dashboard/payment/${club._id}`}
                      className={`block w-full text-center py-3 rounded-xl font-medium transition-all ${
                        club.paymentStatus === 'paid'
                          ? 'bg-green-600 text-white cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow'
                      }`}
                    >
                      {club.paymentStatus === 'paid' ? 'Paid ✓' : 'Pay Now'}
                    </Link>

                    <button
                      onClick={() => handleDelete(club._id)}
                      className="w-full py-3 rounded-xl font-medium bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 hover:border-red-300 transition-all"
                    >
                      Delete Club
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Myclub;