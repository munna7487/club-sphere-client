import React from "react";
import logo from "../../../assets/club-55.jpg";
import logos from "../../../assets/logo001.jpg";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";

const Navbar = () => {
  const { user, logout } = UseAuth();

  const handlelogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/club">Clubs</NavLink>
      </li>
      <li>
        <NavLink to="/show-event">Events</NavLink>
      </li>
      {/* My-Club removed */}
    </>
  );

  return (
    <nav className="bg-base-100 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            {/* Mobile Menu */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>

            {/* Logo */}
            <img className="h-10 w-10 rounded-full" src={logos} alt="logo" />
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost flex items-center gap-2"
                >
                  <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        alt="user"
                      />
                    </div>
                  </div>

                  <span className="hidden md:block font-medium">
                    {user?.displayName || "User"}
                  </span>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow"
                >
                  <li className="px-3 py-2 text-sm font-semibold text-gray-500">
                    MEMBER
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handlelogout} className="text-red-500">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link className="btn btn-primary" to="/login">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
