import React from 'react';
import Useaxiossecuire from '../../../hooks/Useaxiossecuire';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield, FaUserSlash, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Userole from '../../../hooks/Userole';

const Usersmanagement = () => {
  const axiossecure = Useaxiossecuire();
  const { role } = Userole();

  const { data: users = [], refetch } = useQuery({
    enabled: role === 'admin',
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiossecure.get('/users');
      return res.data;
    },
  });

  if (role !== 'admin') {
    return <p className="text-red-500 text-center py-8 text-lg">Access Denied</p>;
  }

  const updateRole = (user, newRole) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Change role of ${user.displayName || user.email} to ${newRole}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axiossecure
          .patch(`/users/${user._id}`, { role: newRole })
          .then(() => {
            Swal.fire('Success!', 'Role updated successfully', 'success');
            refetch();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire('Error!', 'Failed to update role', 'error');
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to permanently delete ${user.displayName || user.email}? This action cannot be undone.`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axiossecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0 || res.data.success) {
              Swal.fire('Deleted!', 'User has been removed.', 'success');
              refetch();
            }
          })
          .catch((err) => {
            console.error('Delete error:', err);
            Swal.fire('Error!', 'Failed to delete user. ' + (err.response?.data?.message || ''), 'error');
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr className="text-sm sm:text-base">
            <th className="w-12 sm:w-16">#</th>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm sm:text-base">
          {users.map((u, i) => (
            <tr key={u._id} className="hover">
              <td className="text-center">{i + 1}</td>
              <td className="font-medium">{u.displayName || '—'}</td>
              <td className="break-all sm:break-normal">{u.email}</td>
              <td className="font-semibold capitalize">{u.role || 'user'}</td>
              <td className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {/* Make Admin */}
                {u.role !== 'admin' && (
                  <button
                    onClick={() => updateRole(u, 'admin')}
                    className="btn btn-success btn-xs sm:btn-sm"
                    title="Make Admin"
                  >
                    <FaUserShield className="text-base" />
                  </button>
                )}

                {/* Make Manager */}
                {u.role !== 'manager' && (
                  <button
                    onClick={() => updateRole(u, 'manager')}
                    className="btn btn-info btn-xs sm:btn-sm text-white"
                    title="Make Manager"
                  >
                    M
                  </button>
                )}

                {/* Make User / Demote */}
                {u.role !== 'user' && (
                  <button
                    onClick={() => updateRole(u, 'user')}
                    className="btn btn-error btn-xs sm:btn-sm"
                    title="Make User (Demote)"
                  >
                    <FaUserSlash className="text-base" />
                  </button>
                )}

                {/* Delete User - admin নিজেকে ডিলিট করতে পারবে না */}
                {u.role !== 'admin' && (
                  <button
                    onClick={() => handleDeleteUser(u)}
                    className="btn btn-error btn-xs sm:btn-sm bg-red-700 hover:bg-red-800 text-white"
                    title="Delete / Remove User"
                  >
                    <FaTrash className="text-base" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No users found
        </div>
      )}
    </div>
  );
};

export default Usersmanagement;