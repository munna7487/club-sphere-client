import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../../hooks/UseAuth';
import Useaxiossecuire from '../../../../hooks/Useaxiossecuire';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Myclub = () => {
  const { user } = UseAuth();
  const axiossecure = Useaxiossecuire();
  const queryClient = useQueryClient(); // ← এটা যোগ করা হয়েছে

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

          // সফল হলে
          if (res.data?.deletedCount > 0 || res.data?.success) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Club has been deleted successfully.',
              icon: 'success',
              timer: 1800,
            });

            // সবচেয়ে নির্ভরযোগ্য উপায় — query ইনভ্যালিডেট করা
            await queryClient.invalidateQueries({
              queryKey: ['myclub', user?.email],
            });

            // অপশনাল: যদি চান তাহলে refetch() ও রাখতে পারেন
            // refetch();
          } else {
            Swal.fire('Failed', 'Delete operation did not succeed', 'error');
          }
        } catch (error) {
          console.error('Delete error:', error);
          Swal.fire({
            title: 'Error!',
            text: error?.response?.data?.message || 'Something went wrong while deleting',
            icon: 'error',
          });
        }
      }
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center my-4">
        <div>
          <h2 className="text-4xl">Manage your clubs and memberships</h2>
        </div>
        <div>
          <Link to="/create" className="btn btn-outline px-8 bg-blue-500">
            Create a Club
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 my-4">My Clubs ({clubs.length})</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={club.bannerUrl} className="h-48 w-full object-cover" alt={club.clubName} />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold">{club.clubName}</h3>
              <p className="text-sm text-gray-500">
                {club.description?.slice(0, 80) || ''}...
              </p>
              <p className="font-medium text-indigo-600">
                Fee: ${club.membershipFee || 0}
              </p>
              <Link
                to={`/dashboard/payment/${club._id}`}
                className={`w-full py-2 rounded-lg mt-2 text-center block ${
                  club.paymentStatus === 'paid'
                    ? 'bg-green-500 text-white pointer-events-none'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }`}
              >
                {club.paymentStatus === 'paid' ? 'Paid' : 'Pay'}
              </Link>
              <button
                onClick={() => handleDelete(club._id)}
                className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
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