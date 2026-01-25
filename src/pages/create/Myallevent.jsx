import React from "react";
import { useQuery } from "@tanstack/react-query";
import Useaxiossecuire from "../../hooks/Useaxiossecuire";
import { Link } from "react-router";

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

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
   <div>

     <div className="p-6">
      <div className="flex justify-between mb-6 items-center">
       <div>
         <h2 className="text-4xl font-bold">Events Management</h2>
              <h2 className="text-3xl">Create and manage events for your clubs</h2>
       </div>
       <div> <Link
          to="/dashboard/event"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Event
        </Link></div>
      </div>
    </div>
     <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Events ({events.length})</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.description.slice(0, 80)}...</p>
              <p className="font-medium">📍 Location: {event.location}</p>
              <p className="font-medium">🗓 Date: {new Date(event.dateTime).toLocaleString()}</p>
              <p className="font-medium">🎟 Type: {event.eventType}</p>
              {event.eventType === "Paid" && <p className="font-medium">💲 Price: {event.price}</p>}
              <p className="font-medium">👥 Max: {event.maxAttendees}</p>
              <span className="badge badge-info mt-2">{event.status}</span>

              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => handleDelete(event._id)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg"
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default Myallevent;
