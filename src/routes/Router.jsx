import { createBrowserRouter } from "react-router-dom";

import Rootlayout from "../layouts/Rootlayout";
import Home from "../pages/Home/home/Home";
import Authlayout from "../layouts/Authlayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Privateroute from "./Privateroute";
import Createclub from "../pages/Createclub";
import Create from "../pages/Create";
import Dashboardlayout from "../layouts/Dashboardlayout";
import Myclub from "../pages/Auth/Dashboard/my-parcel/Myclub";
import Payment from "../pages/Auth/Dashboard/payment/Payment";
import PaymentSuccess from "../pages/Auth/Dashboard/payment/Paymentsucess";
import Paymentcancelled from "../pages/Auth/Dashboard/payment/Paymentcancelled";
import Paymenthistory from "../pages/Auth/Dashboard/Paymenthistory";
import Usersmanagement from "../pages/Auth/Dashboard/Usersmanagement";
import Adminroute from "./Adminroute";
import Clubmanagement from "../pages/Auth/Dashboard/payment/Clubmanagement";
import Event from "../pages/create/Event";
import DashboardRoute from "./DashboardRoute";
import Showevent from "../pages/shared/Showevent";
import EventPayment from "../pages/create/EventPayment";
import EventPaymentSuccess from "../pages/create/EventPaymentSuccess";
import Myallevent from "../pages/create/Myallevent";
import Clubdetails from "../pages/Clubdetails";
import Showdetailsevent from "../pages/shared/Showdetailsevent";
import Clubpayment from "../pages/Auth/Dashboard/payment/Clubpayment";
import ClubPaymentSuccess from "../pages/Auth/Dashboard/payment/ClubPaymentSuccess";
import Clubpaymentcancelled from "../pages/Auth/Dashboard/payment/Clubpaymentcancelled";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create",
        element: (
          <Privateroute>
            <Create />
          </Privateroute>
        ),
      },
      {
        path: "club",
        element: <Createclub />, // approved clubs list
      },
      {
        path: "club/:id",
        element: (
          <Privateroute>
            <Clubdetails />
          </Privateroute>
        ),
      },
      {
        path: "club/:id/payment",
        element: (
          <Privateroute>
            <Clubpayment />
          </Privateroute>
        ),
      },
      {
        path: "show-event",
        element: <Showevent />,
      },
      {
        path: "event/:id",
        element: <Showdetailsevent />,
      },
      {
        path: "event-payment/:id",
        element: (
          <Privateroute>
            <EventPayment />
          </Privateroute>
        ),
      },
      {
        path: "event-payment-success",
        element: <EventPaymentSuccess />,
      },
      {
        path: "club-payment-success",
        element: <ClubPaymentSuccess />,
      },
      {
        path: "club-payment-cancelled",
        element: <Clubpaymentcancelled />,
      },
    ],
  },

  {
    path: "/",
    element: <Authlayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <DashboardRoute>
        <Dashboardlayout />
      </DashboardRoute>
    ),
    children: [
      {
        path: "my-club",
        element: <Myclub />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
      },
      {
        path: "payment-history",
        element: <Paymenthistory />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancelled",
        element: <Paymentcancelled />,
      },
      {
        path: "event",
        element: <Event />,
      },
      {
        path: "my-all-event",
        element: <Myallevent />,
      },
      {
        path: "club-management",
        element: <Clubmanagement />,
      },
      {
        path: "users-management",
        element: (
          <Adminroute>
            <Usersmanagement />
          </Adminroute>
        ),
      },
    ],
  },

  // 404 route (optional – চাইলে যোগ করো)
  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold text-error">
        404 - Page Not Found
      </div>
    ),
  },
]);