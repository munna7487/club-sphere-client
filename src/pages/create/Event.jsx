import React from 'react';
import { useForm } from 'react-hook-form';
import {  useMutation, useQuery } from '@tanstack/react-query';


import Swal from 'sweetalert2';
import Useaxiossecuire from '../../hooks/Useaxiossecuire';
import UseAuth from '../../hooks/UseAuth';

const Event = () => {
  const { user } = UseAuth();
  const axiosSecure = Useaxiossecuire();

  // ================= GET CLUBS (user wise) =================
  const { data: clubs = [] } = useQuery({
    queryKey: ['clubs', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs?email=${user.email}`);
      return res.data;
    },
  });

  // ================= FORM =================
  const { register, handleSubmit, reset } = useForm();

  // ================= CREATE EVENT =================
  const createEvent = useMutation({
    mutationFn: async (eventData) => {
      const res = await axiosSecure.post('/events', eventData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success', 'Event Created Successfully 🎉', 'success');
      reset();
    },
  });

  const onSubmit = (data) => {
    const selectedClub = clubs.find(
      (club) => club._id === data.clubId
    );

    const eventInfo = {
      clubId: data.clubId,
      clubName: selectedClub.clubName,
      title: data.title,
      description: data.description,
      dateTime: data.dateTime,
      location: data.location,
      eventType: data.eventType,
      price: Number(data.price || 0),
      maxAttendees: data.maxAttendees || null,
      createrEmail: user.email,
    };

    createEvent.mutate(eventInfo);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Select Club */}
        <div>
          <label className="font-medium">Select Club</label>
          <select
            {...register('clubId', { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select a club</option>
            {clubs.map((club) => (
              <option key={club._id} value={club._id}>
                {club.clubName}
              </option>
            ))}
          </select>
        </div>

        {/* Event Title */}
        <div>
          <label className="font-medium">Event Title</label>
          <input
            {...register('title', { required: true })}
            className="input input-bordered w-full"
            placeholder="Event title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            {...register('description')}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="font-medium">Date & Time</label>
          <input
            type="datetime-local"
            {...register('dateTime', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-medium">Location</label>
          <input
            {...register('location')}
            className="input input-bordered w-full"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="font-medium">Event Type</label>
          <select
            {...register('eventType')}
            className="select select-bordered w-full"
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="font-medium">Price ($)</label>
          <input
            type="number"
            {...register('price')}
            className="input input-bordered w-full"
            defaultValue={0}
          />
        </div>

        {/* Max Attendees */}
        <div>
          <label className="font-medium">Max Attendees</label>
          <input
            type="number"
            {...register('maxAttendees')}
            className="input input-bordered w-full"
            placeholder="Leave empty for unlimited"
          />
        </div>

        <button className="btn btn-primary w-full">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Event;
