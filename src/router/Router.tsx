import { createBrowserRouter } from "react-router-dom";
import { Contact } from "../pages/Contact";
import { Home } from "../pages/Home";
import { Layout } from "../pages/Layout";
import { NotFound } from "../pages/NotFound";
import { Booking } from "../pages/Booking";
import { Admin } from "../pages/Admin";
import { BookingInfo } from "../pages/BookingInfo";
import { EditBooking } from "../pages/EditBooking";
import {  BookingFinished } from "../pages/Bookingfinished";
import { AdminBooking } from "../pages/AdminBooking";
import { Meny } from "../pages/Meny";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/adminBooking",
        element: <AdminBooking />,
      },
      {
        path: "/bookingInfo/:_id",
        element: <BookingInfo />,
      },
      {
        path: "/editBooking/:_id",
        element: <EditBooking />,
      },
      {
        path: "/bokningsBekraftelse",
        element: <BookingFinished/>
      },{
        path:"/meny",
        element: <Meny/>

      }

    
    ],
  },
]);
