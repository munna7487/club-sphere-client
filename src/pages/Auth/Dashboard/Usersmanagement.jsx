import React from 'react';
import Useaxiossecuire from '../../../hooks/Useaxiossecuire';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield, FaUserSlash } from 'react-icons/fa';
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
    }
  });

  if (role !== 'admin') {
    return <p className="text-red-500 text-center py-8 text-lg">Access Denied</p>;
  }

  const updateRole = (user, newRole) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Change role of ${user.displayName} to ${newRole}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.isConfirmed) {
        axiossecure
          .patch(`/users/${user._id}`, { role: newRole })
          .then(() => refetch());
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
              <td className="font-semibold capitalize">{u.role}</td>

              <td className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {u.role !== 'admin' && (
                  <button
                    onClick={() => updateRole(u, 'admin')}
                    className="btn btn-success btn-xs sm:btn-sm"
                    title="Make Admin"
                  >
                    <FaUserShield className="text-base" />
                  </button>
                )}

                {u.role !== 'manager' && (
                  <button
                    onClick={() => updateRole(u, 'manager')}
                    className="btn btn-info btn-xs sm:btn-sm text-white"
                    title="Make Manager"
                  >
                    M
                  </button>
                )}

                {u.role !== 'user' && (
                  <button
                    onClick={() => updateRole(u, 'user')}
                    className="btn btn-error btn-xs sm:btn-sm"
                    title="Make User"
                  >
                    <FaUserSlash className="text-base" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usersmanagement;