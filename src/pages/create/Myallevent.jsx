import React from "react";
import { useQuery } from "@tanstack/react-query";
import Useaxiossecuire from "../../hooks/Useaxiossecuire";
import { Link } from "react-router-dom"; // corrected typo: react-router -> react-router-dom

const Myallevent = () => {
  const axiosSecure = Useaxiossecuire();

  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ["my-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-events"); // backend token will filter
      return res.data;
    },
  });

  // delete function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const res = await axiosSecure.delete(`/events/${id}`);
      if (res.data.deletedCount > 0) {
        alert("Deleted successfully!");
        refetch();
      }
    }
  };

  if (isLoading) return <p className="text-center py-10 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header Section */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
              Events Management
            </h2>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-600">
              Create and manage events for your clubs
            </h2>
          </div>
          <div className="w-full sm:w-auto">
            <Link
              to="/dashboard/event"
              className="btn btn-success text-white px-4 sm:px-6 py-2 rounded-lg w-full sm:w-auto text-center"
            >
              Create Event
            </Link>
          </div>
        </div>
      </div>

      {/* Events List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
          My Events ({events.length})
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-500 py-10 text-base sm:text-lg">
            No events created yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {event.description.slice(0, 80)}...
                  </p>
                  <p className="text-sm sm:text-base font-medium">
                    📍 Location: {event.location}
                  </p>
                  <p className="text-sm sm:text-base font-medium">
                    🗓 Date: {new Date(event.dateTime).toLocaleString()}
                  </p>
                  <p className="text-sm sm:text-base font-medium">
                    🎟 Type: {event.eventType}
                  </p>
                  {event.eventType === "Paid" && (
                    <p className="text-sm sm:text-base font-medium">
                      💲 Price: {event.price}
                    </p>
                  )}
                  <p className="text-sm sm:text-base font-medium">
                    👥 Max: {event.maxAttendees}
                  </p>
                  <span className="badge badge-info mt-1 sm:mt-2 inline-block">
                    {event.status}
                  </span>

                  <div className="mt-4 sm:mt-5">
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 sm:py-3 rounded-lg font-medium transition-colors"
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