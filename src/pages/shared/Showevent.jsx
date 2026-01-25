import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Useaxiossecuire from '../../hooks/Useaxiossecuire';

const Showevent = () => {
  const axiosSecure = Useaxiossecuire();
  const navigate = useNavigate();

  // 🔍 SEARCH STATE
  const [searchText, setSearchText] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // ⏳ debounce (ONLY update searchValue)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchValue(searchText);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  // ================= GET EVENTS =================
  const {
    data: events = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['events', searchValue],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/events?search=${searchValue}`
      );
      return res.data;
    },
    enabled: false, // 🔥 IMPORTANT: auto query OFF
    keepPreviousData: true, // 🔥 cursor stable
  });

  // 🔁 manually refetch when debounced value changes
  useEffect(() => {
    refetch();
  }, [searchValue, refetch]);

  // ================= REGISTER EVENT =================
  const registerEvent = useMutation({
    mutationFn: async (info) => {
      const res = await axiosSecure.post('/event-register', info);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.message) {
        Swal.fire('Oops!', data.message, 'info');
      } else {
        Swal.fire('Success 🎉', 'Registered Successfully', 'success');
        refetch();
      }
    },
  });

  // ================= HANDLE REGISTER =================
  const handleRegister = (event) => {
    if (event.eventType === 'Paid') {
      navigate(`/event-payment/${event._id}`);
      return;
    }

    registerEvent.mutate({
      eventId: event._id,
      eventTitle: event.title,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="my-4">
          <h4 className="text-4xl font-bold my-2">Upcoming Events</h4>
          <h2 className="text-xl">Don't miss out on what's happening</h2>
        </div>

        {/* 🔍 SEARCH INPUT */}
        <div>
          <input
            type="search"
            className="input input-bordered"
            placeholder="Search by event title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">
        All Events ({events.length})
      </h2>

      {isFetching && (
        <p className="text-sm text-gray-400 mb-4">Searching...</p>
      )}

      {/* EVENTS GRID */}
      {events.length === 0 ? (
        <p className="text-gray-500">No events found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p className="text-sm text-gray-500">{event.clubName}</p>
                <p>{event.description}</p>
                <p className="text-sm">📍 {event.location}</p>
                <p className="text-sm">
                  🕒 {new Date(event.dateTime).toLocaleString()}
                </p>
                <p className="font-semibold">
                  {event.eventType === 'Free'
                    ? 'Free'
                    : `$${event.price}`}
                </p>

                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleRegister(event)}
                    className="btn btn-primary btn-sm"
                  >
                    {event.eventType === 'Free'
                      ? 'Register'
                      : 'Pay & Register'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Showevent;
