import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Useaxiossecuire from '../../../hooks/Useaxiossecuire';
import { Link } from 'react-router-dom';

const Featuredclub = () => {
  const axiosSecure = Useaxiossecuire();

  const { data: featuredClubs = [], isLoading } = useQuery({
    queryKey: ['featured-clubs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/featured-clubs');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (featuredClubs.length === 0) {
    return null;
  }

  // Helper function: truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br
     from-pink-50 via-rose-100 to-orange-200 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-800">
          Featured Clubs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredClubs.map((club) => (
            <div
              key={club._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Banner Image */}
              <div className="relative h-48 sm:h-52 lg:h-56">
                <img
                  src={club.bannerUrl || 'https://via.placeholder.com/600x400?text=Club+Banner'}
                  alt={club.clubName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                  {club.category || 'Community'}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 line-clamp-1">
                  {club.clubName}
                </h3>

                <p className="text-gray-600 mb-3 sm:mb-4 flex-grow">
                  {truncateText(club.description, 40)}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                  <span>📍 {club.location || 'N/A'}</span>
                  <span>👥 {club.membernumber}</span>
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <span className="text-indigo-600 font-medium">
                    Membership: {club.membershipFee ? `$${club.membershipFee}/yr` : 'Free'}
                  </span>

                 <Link
  to={`/club/${club._id}`} // singular "club" to match your router
  className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
>
  View Details
</Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featuredclub;
