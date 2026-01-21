import React from 'react';
import Useaxiossecuire from '../../../hooks/Useaxiossecuire';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield, FaUserSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Usersmanagement = () => {
  const axiossecure = Useaxiossecuire();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiossecure.get('/users');
      return res.data;
    }
  });

  // ================= MAKE ADMIN =================
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to make ${user.displayName} an Admin?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make Admin'
    }).then((result) => {
      if (result.isConfirmed) {
        axiossecure.patch(`/users/${user._id}`, { role: 'admin' })
          .then(res => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire(
                'Success!',
                `${user.displayName} is now an Admin.`,
                'success'
              );
            }
          });
      }
    });
  };

  // ================= REMOVE ADMIN =================
  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to remove Admin role from ${user.displayName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove Admin'
    }).then((result) => {
      if (result.isConfirmed) {
        axiossecure.patch(`/users/${user._id}`, { role: 'user' })
          .then(res => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire(
                'Updated!',
                `${user.displayName} is now a User.`,
                'success'
              );
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">
        Manage Users ({users.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                    <span className="font-semibold">
                      {user.displayName}
                    </span>
                  </div>
                </td>

                <td>{user.email}</td>
                <td className="font-bold">{user.role}</td>

                <td>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-error btn-sm"
                      title="Remove Admin"
                    >
                      <FaUserSlash />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-success btn-sm"
                      title="Make Admin"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Usersmanagement;
