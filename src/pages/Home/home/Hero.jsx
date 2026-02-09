import { FaUsers, FaTrophy, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative overflow-hidden my-4.5">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-white to-yellow-200  rounded-2xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900">
          Discover Your{" "}
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Community
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
          Join local clubs, attend exclusive events, and connect with people who
          share your passions. From photography to tech, find your tribe today.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link Link to="/club" className="btn bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none px-8">
            Explore Clubs →
          </Link >
          <button className="btn btn-outline px-8">
            Create a Club
          </button>
        </div>

        {/* Divider */}
        <div className="mt-20 border-t"></div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Members */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">
              <FaUsers />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              5,000+
            </h3>
            <p className="text-slate-500">Active Members</p>
          </div>

          {/* Clubs */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl">
              <FaTrophy />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              120+
            </h3>
            <p className="text-slate-500">Active Clubs</p>
          </div>

          {/* Events */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-xl">
              <FaCalendarAlt />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              300+
            </h3>
            <p className="text-slate-500">Monthly Events</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
