import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import Useaxiossecuire from '../hooks/Useaxiossecuire';
import UseAuth from '../hooks/UseAuth';

const Create = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = UseAuth();
  const axiossecure = Useaxiossecuire();
  const queryClient = useQueryClient(); // ✅ React Query Client

  const onSubmit = (data) => {
    data.createremail = user?.email;

    // ✅ ONLY ADDITION (NO DESIGN CHANGE)
    data.paymentStatus = 'pay';

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiossecure.post('/clubs', data).then(res => {
          queryClient.invalidateQueries(['myclub', user?.email]);
          Swal.fire('Created!', 'Your club has been created.', 'success');
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-6">Create New Club</h1>
      <h2 className="text-lg text-center mt-2">Enter your new club details</h2>

      <div className="max-w-2xl mx-auto mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Club Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Club Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.clubName ? 'border-red-500' : ''}`}
              placeholder="e.g., Photography, Sports"
              {...register('clubName', { required: 'Club name is required' })}
            />
            {errors.clubName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.clubName.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.description ? 'border-red-500' : ''}`}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category + Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.category ? 'border-red-500' : ''}`}
                {...register('category', { required: 'Category is required' })}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register('location')}
              />
            </div>
          </div>

          {/* Banner */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Image URL
            </label>
            <input
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register('bannerUrl')}
            />
          </div>

          {/* Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Membership Fee ($/year)
            </label>
            <input
              type="number"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register('membershipFee')}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-md hover:from-purple-600 hover:to-purple-700"
            >
              Create Club
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Create;
