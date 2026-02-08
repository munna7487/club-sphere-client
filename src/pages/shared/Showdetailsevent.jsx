import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Useaxiossecuire from '../../hooks/Useaxiossecuire';

const Showdetailsevent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = Useaxiossecuire();

  const { data: event, isLoading, error, refetch } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-zinc-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-6"></div>
          <p className="text-xl font-medium text-slate-700">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-zinc-100">
        <div className="text-center p-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl max-w-lg border border-slate-200">
          <div className="text-7xl mb-6">😔</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Event Not Found</h2>
          <p className="text-slate-600 mb-8 text-lg">
            {error?.message || 'The event you are looking for does not exist or has been removed.'}
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary px-10 py-4 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleRegisterClick = () => {
    navigate(`/event-payment/${id}`);
  };

  // Number কনভার্ট করে নিরাপদে হিসাব
  const maxAtt = Number(event.maxAttendees) || 0;
  const currentAtt = Number(event.attendees) || 0;
  const spotsLeft = maxAtt - currentAtt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-zinc-100 pb-16">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-8">
        <button
          onClick={() => window.history.back()}
          className="group inline-flex items-center gap-2 text-lg font-semibold text-slate-700 hover:text-purple-700 transition-all duration-300"
        >
          <span className="text-2xl group-hover:-translate-x-1.5 transition-transform">←</span>
          Back to Events
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/70 overflow-hidden">
          {/* Hero Section */}
          <div className="relative px-8 pt-12 pb-16 md:px-12 lg:px-16 bg-gradient-to-br from-purple-600/10 via-indigo-600/5 to-transparent">
            {/* Price Badge */}
            <div className="absolute top-8 right-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xl shadow-lg">
                {event.eventType?.toLowerCase() === 'free' ? (
                  <span>FREE</span>
                ) : (
                  <>
                    ${event.price || 0}
                  </>
                )}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
              {event.title}
            </h1>

            {/* Meta Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm px-5 py-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-3xl flex-shrink-0">📅</div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Date & Time</p>
                  <p className="text-lg font-semibold text-slate-800">
                    {new Date(event.dateTime).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm px-5 py-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-3xl flex-shrink-0">📍</div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Location</p>
                  <p className="text-lg font-semibold text-slate-800">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm px-5 py-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-3xl flex-shrink-0">👥</div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Attendees</p>
                  <p className="text-lg font-semibold text-slate-800">
                    {currentAtt} / {maxAtt || '∞'}
                  </p>
                </div>
              </div>
            </div>

            {/* Organizer */}
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center text-3xl">🏢</div>
              <div>
                <p className="text-sm text-slate-500">Organized by</p>
                <p className="text-xl font-bold text-slate-900">{event.clubName || 'Unknown Club'}</p>
              </div>
            </div>
          </div>

          {/* About & Register */}
          <div className="p-8 md:p-12 lg:p-16">
            <div className="mb-14">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">About This Event</h3>
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-purple-50/30 rounded-3xl p-8 md:p-10 border border-slate-200 shadow-inner">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Register Now</h3>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-2xl">
                    <span className="font-bold text-slate-800">Fee:</span>{' '}
                    <span className="text-purple-700 font-extrabold">
                      {event.eventType?.toLowerCase() === 'free' ? 'FREE' : `$${event.price || 0}`}
                    </span>
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-2xl">
                    <span className="font-bold text-slate-800">Spots left:</span>{' '}
                    <span className="text-indigo-700 font-extrabold">
                      {spotsLeft >= 0 ? spotsLeft : '∞'} / {maxAtt || '∞'}
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleRegisterClick}
                disabled={spotsLeft <= 0 && maxAtt > 0}
                className={`btn w-full font-bold text-xl py-7 rounded-2xl shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-none ${
                  spotsLeft <= 0 && maxAtt > 0
                    ? 'btn-disabled bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
                }`}
              >
                {event.eventType?.toLowerCase() === 'free'
                  ? 'Register Free'
                  : spotsLeft <= 0 && maxAtt > 0
                  ? 'Event Full'
                  : `Register & Pay $${event.price}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showdetailsevent;