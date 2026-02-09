import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from "../../../assets/logo001.jpg"
const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0b1220] to-[#050a14] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold">
                C
              </div> */}
              <img className="h-10 w-10 rounded-full " src={logo} alt="" />
              <h2 className="text-xl font-semibold text-white">ClubSphere</h2>
            </div>
            <p className="text-sm">
              Connect, collaborate, and grow with local communities.
              The best platform to manage your clubs and events.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>Browse Clubs</li>
              <li>Upcoming Events</li>
              <li>Pricing</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Connect (এখানে আসল লিঙ্ক দাও) */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm">Connect</h3>
            <div className="flex gap-5 text-2xl text-gray-300">
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/company/yourcompany OR https://www.linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://www.instagram.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm">
          <p>© 2026 ClubSphere. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Community</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;