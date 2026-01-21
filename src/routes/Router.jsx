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
      <Privateroute>
        <Dashboardlayout />
      </Privateroute>
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
