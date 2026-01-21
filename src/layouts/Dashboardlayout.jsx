import React from 'react';
import { FaCcDinersClub, FaUsers } from 'react-icons/fa';
import { MdOutlineEmojiEvents, MdOutlinePayments } from 'react-icons/md';
import { NavLink, Link, Outlet } from 'react-router-dom';
import Userole from '../hooks/Userole';
import { SiSamsclub } from "react-icons/si";
const Dashboardlayout = () => {

  const { role, isLoading } = Userole();

  // loading state handle
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 px-4">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost btn-square lg:hidden"
          >
            ☰
          </label>
          <span className="text-lg font-semibold">Club Sphere Dashboard</span>
        </div>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu w-64 min-h-full bg-base-200 p-4 gap-1">

          {/* Home */}
          <li>
            <Link to="/">🏠 Home</Link>
          </li>

          {/* My Club */}
          <li>
            <NavLink to="/dashboard/my-club">
              <FaCcDinersClub />
              My Club
            </NavLink>
          </li>

          {/* Payment History */}
          <li>
            <NavLink to="/dashboard/payment-history">
              <MdOutlinePayments />
              Payment History
            </NavLink>
          </li>
          {/* event */}
      <li>
            <NavLink to="/dashboard/event">
              <MdOutlineEmojiEvents />
              My Event
            </NavLink>
          </li>

          {/* club Management (ADMIN ONLY) */}
          {
            role==='admin'&&(<li>
            <NavLink to="/dashboard/club-management">
             <SiSamsclub />
              Club Management
            </NavLink>
          </li>)
          }
          {/* Users Management (ADMIN ONLY) */}
          {role === 'admin' && (
            <li>
              <NavLink to="/dashboard/users-management">
                <FaUsers />
                Users Management
              </NavLink>
            </li>
          )}

        </ul>
      </div>
    </div>
  );
};

export default Dashboardlayout;
