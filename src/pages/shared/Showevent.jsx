import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Useaxiossecuire from '../../hooks/Useaxiossecuire';

const Showevent = () => {
  const axiosSecure = Useaxiossecuire();
  const navigate = useNavigate();

  // ================= GET EVENTS =================
  const { data: events = [], refetch } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await axiosSecure.get('/events');
      return res.data;
    },
  });

  // ================= REGISTER FREE EVENT =================
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
      // 🔥 Navigate to Event Payment Page for Paid Events
      navigate(`/event-payment/${event._id}`);
      return;
    }

    // 🔥 Directly Register Free Event
    const registerInfo = {
      eventId: event._id,
      eventTitle: event.title,
    };

    registerEvent.mutate(registerInfo);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        All Events ({events.length})
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{event.title}</h2>

              <p className="text-sm text-gray-500">{event.clubName}</p>

              <p>{event.description}</p>

              <p className="text-sm">📍 {event.location}</p>

              <p className="text-sm">🕒 {new Date(event.dateTime).toLocaleString()}</p>

              <p className="font-semibold">
                {event.eventType === 'Free' ? 'Free' : `$${event.price}`}
              </p>

              <div className="card-actions justify-end">
                <button
                  onClick={() => handleRegister(event)}
                  className="btn btn-primary btn-sm"
                >
                  {event.eventType === 'Free' ? 'Register' : 'Pay & Register'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showevent;
