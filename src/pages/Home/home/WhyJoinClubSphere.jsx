import { FaUsers, FaBolt, FaShieldAlt, FaHeart } from "react-icons/fa";

const WhyJoinClubSphere = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">
            Why Join ClubSphere?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            More than just a platform—it's your gateway to meaningful connections
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-md flex gap-5">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <FaUsers className="text-indigo-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Build Connections
              </h3>
              <p className="text-gray-500 text-sm">
                Meet people who share your passions and build lasting friendships
                in your local community.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-md flex gap-5">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <FaBolt className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Learn & Grow
              </h3>
              <p className="text-gray-500 text-sm">
                Access exclusive workshops, events, and resources to develop new
                skills and knowledge.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-md flex gap-5">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <FaShieldAlt className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Safe & Verified
              </h3>
              <p className="text-gray-500 text-sm">
                All clubs are verified and moderated to ensure a safe, welcoming
                environment for everyone.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-md flex gap-5">
            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
              <FaHeart className="text-pink-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">
                Make an Impact
              </h3>
              <p className="text-gray-500 text-sm">
                Contribute to your community, support local causes, and make a
                difference together.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyJoinClubSphere;
