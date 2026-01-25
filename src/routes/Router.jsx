import { createBrowserRouter } from "react-router";
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
import {Elements} from '@stripe/react-stripe-js';
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      {
        index: true,
        Component: Home,
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
  path: "club/:id",
  element: <Clubdetails />
},
      {
       path:'show-event',
       element:<Showevent></Showevent>
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
        path: "club",
        element: (
         
            <Createclub />
         
        ),
      },
    ],
  },
  {
    path: "/",
    Component: Authlayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
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
        Component: Myclub,
      },
      {
        // 🔥 FIXED HERE
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: Paymenthistory,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: Paymentcancelled,
      },
      {
  path: 'event',
  element: <Event />
}
,
{
  path:'my-all-event',
  element:<Myallevent></Myallevent>
},

      {
      path:'club-management',
      element:<Clubmanagement></Clubmanagement>,
      },
      {
        path:"users-management",
      element:<Adminroute><Usersmanagement></Usersmanagement></Adminroute>
      }
    ],
  },
]);
