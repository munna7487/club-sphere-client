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
    return <p className="text-red-500">Access Denied</p>;
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
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u, i) => (
          <tr key={u._id}>
            <td>{i + 1}</td>
            <td>{u.displayName}</td>
            <td>{u.email}</td>
            <td className="font-semibold">{u.role}</td>

            <td className="flex gap-2">
              {u.role !== 'admin' && (
                <button
                  onClick={() => updateRole(u, 'admin')}
                  className="btn btn-success btn-sm"
                  title="Make Admin"
                >
                  <FaUserShield />
                </button>
              )}

              {u.role !== 'manager' && (
                <button
                  onClick={() => updateRole(u, 'manager')}
                  className="btn btn-info btn-sm"
                  title="Make Manager"
                >
                  M
                </button>
              )}

              {u.role !== 'user' && (
                <button
                  onClick={() => updateRole(u, 'user')}
                  className="btn btn-error btn-sm"
                  title="Make User"
                >
                  <FaUserSlash />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Usersmanagement;
