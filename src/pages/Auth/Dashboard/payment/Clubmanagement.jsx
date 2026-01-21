import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Useaxiossecuire from '../../../../hooks/Useaxiossecuire';

const Clubmanagement = () => {
  const axiossecure = Useaxiossecuire();

  const { data: clubs = [], refetch, isLoading } = useQuery({
    queryKey: ['paid-clubs'],
    queryFn: async () => {
      const res = await axiossecure.get('/admin/paid-clubs');
      return res.data;
    }
  });

  // APPROVE
  const handleApprove = (club) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Approve club "${club.clubName}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
    }).then((result) => {
      if (result.isConfirmed) {
        axiossecure.patch(`/admin/clubs/approve/${club._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire('Approved!', 'Club approved successfully', 'success');
            refetch();
          }
        });
      }
    });
  };

  // REJECT
  const handleReject = (club) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Reject club "${club.clubName}" ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
    }).then((result) => {
      if (result.isConfirmed) {
        axiossecure.delete(`/admin/clubs/reject/${club._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire('Rejected!', 'Club rejected and removed', 'success');
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {clubs.map((club) => (
        <div
          key={club._id}
          className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300"
        >
          {/* IMAGE */}
          <figure className="h-48 overflow-hidden">
            <img
              src={club.bannerUrl}
              alt={club.clubName}
              className="h-full w-full object-cover"
            />
          </figure>

          {/* BODY */}
          <div className="card-body p-5">
            <h2 className="card-title text-lg">{club.clubName}</h2>

            <p className="text-sm text-gray-600 line-clamp-3">
              {club.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              <span className="badge badge-outline">{club.category}</span>
              <span className="badge badge-outline">{club.location}</span>
            </div>

            <p className="mt-2 font-semibold text-primary">
              Fee: ${club.membershipFee}
            </p>

            {/* ACTIONS */}
            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => handleApprove(club)}
                className="btn btn-success btn-sm"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(club)}
                className="btn btn-error btn-sm"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Clubmanagement;
