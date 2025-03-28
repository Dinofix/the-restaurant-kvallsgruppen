import axios from "axios";
import "../styles/_Admin.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { URL, restaurantId } from "../services/RestaurantService";
import { IBooking } from "../models/IBooking";
import { FaSpinner } from "react-icons/fa";

export const Admin = () => {
  const [adminBookings, setAdminBookings] = useState<IBooking[]>();

  if (!adminBookings) {
    axios
      .get(URL + "/booking/restaurant/" + restaurantId)
      .then((response) => {
        setAdminBookings(response.data);
      })
      .catch((error) => {
        console.log("Fel vid hämtning av bokningar", error);
      });
  }

  return (
    <>
      <br />
      <h2>Adminportal</h2>
      <br />
      <button><Link to={"/AdminBooking"}>Lägg till</Link></button>
      <br />
      <br />
      {adminBookings ? (
        <ul id="admin">
          {adminBookings.map((booking) => (
            <li key={booking._id}>
              Datum: {booking.date} Tid: {booking.time} Antal gäster:{" "}
              {booking.numberOfGuests}{" "}
              <button>
                <Link to={"/bookingInfo/" + booking._id}>Info</Link>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <FaSpinner className="spinner" /> Loading...
        </p>
      )}
    </>
  );
};
