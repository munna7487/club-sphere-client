import React from 'react';
import { FaSearch, FaUserPlus, FaCalendarAlt, FaTrophy } from "react-icons/fa";
const Banner = () => {
    return (
        <div>
            <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-3">How ClubSphere Works</h2>
        <p className="text-gray-500 mb-12">
          Join a thriving community in four simple steps
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Discover */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-100 mb-5">
              <FaSearch className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p className="text-gray-500 text-sm">
              Browse hundreds of local clubs across various categories and
              find communities that match your interests.
            </p>
          </div>

          {/* Join */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-100 mb-5">
              <FaUserPlus className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Join</h3>
            <p className="text-gray-500 text-sm">
              Become a member with just one click. Choose from free or paid
              memberships based on the club.
            </p>
          </div>

          {/* Participate */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-pink-100 mb-5">
              <FaCalendarAlt className="text-pink-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Participate</h3>
            <p className="text-gray-500 text-sm">
              Attend exclusive events, workshops, and meetups organized by
              your clubs.
            </p>
          </div>

          {/* Grow */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-yellow-100 mb-5">
              <FaTrophy className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Grow</h3>
            <p className="text-gray-500 text-sm">
              Network with like-minded people, learn new skills, and achieve
              your personal goals.
            </p>
          </div>

        </div>
      </div>
    </section>
          
        </div>
    );
};

export default Banner;