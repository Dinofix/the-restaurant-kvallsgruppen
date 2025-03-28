import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { URL } from "../services/RestaurantService";
import { IBooking } from "../models/IBooking";
import { IBookingExt } from "../models/IBookingExt";
import { FaSpinner} from 'react-icons/fa';
import "../styles/_bookingInfo.scss";
import { DeleteButton} from "../Style/StyledButton"


export const BookingInfo = () => {
  const [bookingInfo, setBookingInfo] = useState<IBooking>();
  const [customerInfo, setCustomerInfo] = useState<IBookingExt>();
  const { _id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Är du helt säker på att du vill radera denna bokning?"
    );
    if (isConfirmed) {
      axios
        .delete(URL + "/booking/delete/" + _id)
        .then(() => {
          navigate("/Admin");
        })
        .catch((error) => {
          console.log("Gick inte att radera bokningen", error);
        });
    }
  };

  if (!bookingInfo) {
    axios
      .get(URL + "/booking/" + _id)
      .then((response) => {
        const bookingAPI: IBooking = response.data[0];
        setBookingInfo(bookingAPI);
        axios
          .get(URL + "/customer/" + bookingAPI.customerId)
          .then((response) => {
            const customerAPI: IBookingExt = response.data[0];
            setCustomerInfo(customerAPI);
          })
          .catch((error) => {
            console.log("Fel vid hämtning av kund", error);
          });
      })
      .catch((error) => {
        console.log("Fel vid hämtning av bokningsinfo", error);
      });
  }

  return (
    <>
      {bookingInfo ? (
        <>
          <br />
          <h2>Bokning</h2>
          <p>Datum: {bookingInfo.date} </p>
          <p>Tid: {bookingInfo.time} </p>
          <p>Gäster: {bookingInfo.numberOfGuests} </p>
          {customerInfo && (
            <>
              <br />
              <h2>Kund</h2>
              <p>Namn: {customerInfo.name} </p>
              <p>Efternamn: {customerInfo.lastname} </p>
              <p>Email: {customerInfo.email} </p>
              <p>Telefon: {customerInfo.phone} </p>
              <br />
              <button>
                <Link to={"/Admin"}>Tillbaka</Link>
              </button>
              <button>
                <Link to={"/EditBooking/" + bookingInfo._id}>
                  Redigera Bokning
                </Link>
              </button>
              <DeleteButton onClick={handleDelete}>Radera Bokning</DeleteButton>
              <br />
              <br />
            </>
          )}
        </>
      ) : (
        <p>
          <FaSpinner className="spinner" /> Loading...
          </p>
      )}
    </>
  );
};
