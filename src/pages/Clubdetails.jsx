import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Useaxiossecuire from '../hooks/Useaxiossecuire'; // adjust path
import { toast } from 'react-hot-toast';

const Clubdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = Useaxiossecuire();

  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const [clubRes, eventsRes, memberRes] = await Promise.all([
          axiosSecure.get(`/clubs/${id}`),
          axiosSecure.get(`/clubs/${id}/events`),
          axiosSecure.get(`/clubs/${id}/is-member`)
        ]);

        setClub(clubRes.data);
        setEvents(eventsRes.data);
        setIsMember(memberRes.data.isMember || false);
      } catch (err) {
        console.error('Error fetching club details:', err);
        toast.error('Failed to load club information');
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-6 text-lg font-medium text-base-content/70">
          Loading club details...
        </p>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center text-error text-xl font-semibold">
        Club not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/40">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Banner / Hero */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10 h-80 md:h-96 lg:h-[28rem]">
          <img
            src={club.bannerUrl || 'https://via.placeholder.com/1200x500?text=Club+Banner'}
            alt={club.clubName}
            className="w-full h-full object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
              {club.clubName}
            </h1>
            <div className="flex flex-wrap gap-3 mt-4">
              {club.category && (
                <div className="badge badge-lg bg-primary/80 text-white border-none px-4 py-3">
                  {club.category}
                </div>
              )}
              {club.location && (
                <div className="badge badge-lg bg-neutral/80 text-white border-none px-4 py-3">
                  {club.location}
                </div>
              )}
              <div className="badge badge-lg bg-success/80 text-white border-none px-4 py-3">
                ${club.membershipFee}/year
              </div>
              <div className="badge badge-lg bg-info/80 text-white border-none px-4 py-3">
                {club.status || 'Pending'}
              </div>
              {isMember && (
                <div className="badge badge-lg bg-success/90 text-white border-none px-4 py-3">
                  ✓ Member
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - About & Events */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body p-6 md:p-8">
                <h2 className="card-title text-3xl font-bold mb-4">About This Club</h2>
                <p className="text-base-content/80 leading-relaxed text-lg">
                  {club.description || 'No description available.'}
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body p-6 md:p-8">
                <h2 className="card-title text-3xl font-bold mb-6">Upcoming Events</h2>
                {events.length === 0 ? (
                  <div className="alert alert-info shadow-lg">
                    <span>No upcoming events scheduled yet.</span>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {events.map((event) => (
                      <div
                        key={event._id}
                        className="card bg-base-50 hover:bg-base-100 border border-base-300 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl group"
                      >
                        <div className="card-body p-6">
                          <h3 className="card-title text-xl font-semibold group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-base-content/70 mt-2 line-clamp-3">
                            {event.description}
                          </p>
                          <div className="mt-4 space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                              <span className="badge badge-outline badge-sm">Date</span>
                              {new Date(event.dateTime).toLocaleString([], {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="badge badge-outline badge-sm">Location</span>
                              {event.location || 'TBA'}
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="badge badge-outline badge-sm">Type</span>
                              {event.eventType || 'General'}
                            </p>
                          </div>
                          <div className="card-actions mt-6">
                            <button
                              onClick={() => navigate(`/event/${event._id}`)}
                              className="btn btn-primary btn-block group"
                            >
                              View & Register
                              <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Membership Sidebar */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-8">
              <div className="card-body p-6">
                <h3 className="text-2xl font-bold mb-4">Membership</h3>

                <div className="stats shadow bg-base-200 stats-vertical lg:stats-horizontal w-full">
                  <div className="stat place-items-center">
                    <div className="stat-title">Annual Fee</div>
                    <div className="stat-value text-primary">${club.membershipFee || '—'}</div>
                    <div className="stat-desc">per year</div>
                  </div>
                  <div className="stat place-items-center">
                    <div className="stat-title">Members</div>
                    <div className="stat-value text-secondary">
                      {club.membernumber || 0}
                    </div>
                    <div className="stat-desc">joined</div>
                  </div>
                </div>

                <div className="mt-6">
                  {isMember ? (
                    <div className="alert alert-success shadow-lg">
                      <span>Already a Member ✓ Payment Completed</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate(`/club/${id}/payment`)}
                      className="btn btn-secondary btn-lg w-full"
                    >
                      Join for ${club.membershipFee || '—'}
                    </button>
                  )}

                  <p className="text-center text-xs text-base-content/60 mt-3">
                    {isMember
                      ? 'Payment completed • Welcome to the community!'
                      : 'Approved club • Safe & friendly community'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clubdetails;