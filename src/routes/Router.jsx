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
import Myparcel from "../pages/Auth/Dashboard/my-parcel/Myclub";
import Myclub from "../pages/Auth/Dashboard/my-parcel/Myclub";
import Payment from "../pages/Auth/Dashboard/payment/Payment";
import Paymentsucess from "../pages/Auth/Dashboard/payment/Paymentsucess";
import Paymentcancelled from "../pages/Auth/Dashboard/payment/Paymentcancelled";
import PaymentSuccess from "../pages/Auth/Dashboard/payment/Paymentsucess";


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
        path: "/create",
        element: <Privateroute><Create></Create></Privateroute>,
      },
      {
        path: 'club',
        element: <Privateroute><Createclub></Createclub></Privateroute>
      }

    ]
  },
  {
    path: '/',
    Component: Authlayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      }
    ]
  },
  {
    path: 'dashboard',
    element: <Privateroute><Dashboardlayout></Dashboardlayout></Privateroute>,
    children: [
      {
        path: 'my-club',
        Component: Myclub,
      },
      {
        path: 'payment/:_id',
        Component: Payment,
      },
      {
  path: 'payment-success',
  Component: PaymentSuccess,
},
{
  path: 'payment-cancelled',
  Component: Paymentcancelled,
}
    ]
  }

]);