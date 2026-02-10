import React from "react";
import { useQuery } from "@tanstack/react-query";
import Useaxiossecuire from "../../hooks/Useaxiossecuire";
import { Link } from "react-router-dom";

const Myallevent = () => {
  const axiosSecure = Useaxiossecuire();

  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ["my-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-events");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const res = await axiosSecure.delete(`/events/${id}`);
      if (res.data.deletedCount > 0) {
        alert("Deleted successfully!");
        refetch();
      }
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 pb-12">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary/10 via-base-100 to-secondary/10 py-10 sm:py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                My Events Dashboard
              </h1>
              <p className="mt-2 text-base-content/70 text-lg">
                Manage your club events with ease
              </p>
            </div>
            <Link
              to="/dashboard/event"
              className="btn btn-primary btn-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Create Event
            </Link>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-base-content/90 flex items-center gap-3">
          Your Events
          <span className="badge badge-lg badge-primary">{events.length}</span>
        </h2>

        {events.length === 0 ? (
          <div className="card bg-base-100/60 backdrop-blur-md border border-base-300/50 shadow-xl rounded-3xl p-12 text-center">
            <div className="text-6xl mb-6 opacity-70">🎉</div>
            <h3 className="text-2xl font-bold mb-4 text-base-content/80">
              No events yet
            </h3>
            <p className="text-base-content/60 mb-8 max-w-md mx-auto">
              Start creating amazing events for your club community right now!
            </p>
            <Link to="/dashboard/event" className="btn btn-primary btn-lg shadow-lg">
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="card bg-base-100/90 backdrop-blur-sm border border-base-200/40 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group h-full max-h-[380px]"
              >
                <div className="card-body p-5 lg:p-6 space-y-3.5">
                  <h3 className="card-title text-lg lg:text-xl font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {event.title}
                  </h3>

                  <p className="text-base-content/65 text-sm lg:text-base line-clamp-2 min-h-[2.8rem]">
                    {event.description.slice(0, 110)}...
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-sm lg:text-base mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-lg">📍</span>
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-lg">🗓</span>
                      <span className="truncate">
                        {new Date(event.dateTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-lg">🎟</span>
                      <span>{event.eventType}</span>
                    </div>
                    {event.eventType === "Paid" && (
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-lg">💲</span>
                        <span className="font-semibold">{event.price}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="badge badge-outline badge-md">
                      Max: {event.maxAttendees}
                    </div>
                    <div className="badge badge-info badge-md">
                      {event.status || "Active"}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-base-300/50">
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="btn btn-error btn-sm lg:btn-md w-full text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Myallevent;