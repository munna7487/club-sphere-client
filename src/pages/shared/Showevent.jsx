import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Useaxiossecuire from '../../hooks/Useaxiossecuire';

const Showevent = () => {
  const axiosSecure = Useaxiossecuire();
  const navigate = useNavigate();

  // search state
  const [searchText, setSearchText] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchValue(searchText);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  // fetch events
  const {
    data: events = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['events', searchValue],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events?search=${searchValue}`);
      return res.data;
    },
    enabled: false,               // manually control when to fetch
    keepPreviousData: true,
  });

  // refetch when debounced search value changes
  useEffect(() => {
    refetch();
  }, [searchValue, refetch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header + Search */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-4xl font-bold mb-2">Upcoming Events</h4>
          <h2 className="text-xl text-gray-600">
            Don't miss out on what's happening
          </h2>
        </div>

        <div>
          <input
            type="search"
            className="input input-bordered w-64"
            placeholder="Search by event title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {/* Title with count */}
      <h2 className="text-3xl font-bold mb-6">
        All Events ({events.length})
      </h2>

      {/* Loading indicator */}
      {isFetching && (
        <p className="text-sm text-gray-500 mb-6">Searching events...</p>
      )}

      {/* No events found */}
      {events.length === 0 && !isFetching ? (
        <p className="text-center text-gray-500 py-10">
          No events found
        </p>
      ) : (
        /* Events grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/event/${event._id}`)}
            >
              <div className="card-body">
                <h2 className="card-title line-clamp-2">{event.title}</h2>

                <p className="text-sm text-gray-500">{event.clubName}</p>

                <p className="text-sm line-clamp-3">{event.description}</p>

                <div className="text-sm mt-2 space-y-1">
                  <p>📍 {event.location}</p>
                  <p>🕒 {new Date(event.dateTime).toLocaleString()}</p>
                </div>

                <p className="font-semibold mt-2">
                  {event.eventType === 'Free'
                    ? 'Free'
                    : `$${event.price}`}
                </p>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click when button is clicked
                      navigate(`/event/${event._id}`);
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Details
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