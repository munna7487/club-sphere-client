import React from 'react';
import { FaSearch, FaUserPlus, FaCalendarAlt, FaTrophy } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 my-5 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading with subtle gradient text */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          How ClubSphere Works
        </h2>
        
        <p className="text-lg text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto">
          Join a thriving community in four simple steps — discover, connect, participate, and grow.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Step 1: Discover */}
          <div className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 mb-6 shadow-md group-hover:shadow-xl transition-shadow">
              <FaSearch className="text-blue-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">Discover</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Browse hundreds of local clubs across various categories and find communities that match your interests.
            </p>
          </div>

          {/* Step 2: Join */}
          <div className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 mb-6 shadow-md group-hover:shadow-xl transition-shadow">
              <FaUserPlus className="text-purple-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">Join</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Become a member with just one click. Choose from free or paid memberships based on the club.
            </p>
          </div>

          {/* Step 3: Participate */}
          <div className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 mb-6 shadow-md group-hover:shadow-xl transition-shadow">
              <FaCalendarAlt className="text-pink-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">Participate</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Attend exclusive events, workshops, and meetups organized by your clubs.
            </p>
          </div>

          {/* Step 4: Grow */}
          <div className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-200 mb-6 shadow-md group-hover:shadow-xl transition-shadow">
              <FaTrophy className="text-yellow-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">Grow</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Network with like-minded people, learn new skills, and achieve your personal goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;