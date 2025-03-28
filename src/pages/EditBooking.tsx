import { ChangeEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IBooking } from "../models/IBooking";
import { URL, restaurantId } from "../services/RestaurantService";
import axios from "axios";
import { IBookingExt } from "../models/IBookingExt";

export const EditBooking = () => {
  const [editBooking, setEditBooking] = useState<IBooking>();
  const [currentBookings, setCurrentBookings] = useState<IBooking[]>();
  const [editCustomer, setEditCustomer] = useState<IBookingExt>();
  const { _id } = useParams();
  const navigate = useNavigate();

  if (!currentBookings) {
    axios
      .get(URL + "/booking/restaurant/" + restaurantId)
      .then((response) => {
        console.log(response.data);

        setCurrentBookings(response.data);
      })
      .catch((error) => {
        console.log("Fel vid hämtning", error);
      });
  }

  if (!editBooking) {
    axios
      .get(URL + "/booking/" + _id)
      .then((response) => {
        const bookingAPI: IBooking = response.data[0];
        setEditBooking(bookingAPI);
        console.log(bookingAPI);

        axios
          .get(URL + "/customer/" + bookingAPI.customerId)
          .then((response) => {
            const customerAPI: IBookingExt = response.data[0];
            setEditCustomer(customerAPI);
          })
          .catch((error) => {
            console.log("Fel vid hämtning av kund", error);
          });
      })
      .catch((error) => {
        console.log("Fel vid hämtning av bokningsinfo", error);
      });
  }

  const setDateChecked = (e: ChangeEvent<HTMLInputElement>) => {
    let newDate = e.target.value;
    if (newDate === undefined || editBooking === undefined) {
      return;
    }
    setEditBooking({ ...editBooking, date: newDate });
  };

  const setTimeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    let newTime = e.target.value;
    if (newTime === undefined || editBooking === undefined) {
      return;
    }
    setEditBooking({ ...editBooking, time: newTime });
  };

  const setGuests = (e: ChangeEvent<HTMLInputElement>) => {
    let newNumberOfGuests = parseInt(e.target.value, 10);
    if (
      isNaN(newNumberOfGuests) ||
      newNumberOfGuests < 1 ||
      newNumberOfGuests > 6
    ) {
      return;
    }
    setEditBooking({ ...editBooking!, numberOfGuests: newNumberOfGuests });
  };
  const setName = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value.trim();
    if (name === undefined || editCustomer === undefined) {
      return;
    }
    if (/^[A-Za-z\s]{0,20}$/.test(name)) {
      setEditCustomer({ ...editCustomer, name: name });
    } else {
      console.error("Invalid name");
    }
  };

  const setLastName = (e: ChangeEvent<HTMLInputElement>) => {
    let lastName = e.target.value.trim();
    if (lastName === undefined || editCustomer === undefined) {
      return;
    }
    if (/^[A-Za-z\s]{0,30}$/.test(lastName)) {
      setEditCustomer({ ...editCustomer, lastname: lastName });
    } else {
      console.error("Invalid lastname");
    }
  };

  const setPhone = (e: ChangeEvent<HTMLInputElement>) => {
    let phone = e.target.value.trim();

    if (phone === undefined || editCustomer === undefined) {
      return;
    }
    if (/^\d{0,20}$/.test(phone)) {
      setEditCustomer({ ...editCustomer, phone: phone });
    } else {
      console.error("Invalid phone");
    }
  };

  const setEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let email = e.target.value.trim();

    if (email === undefined || editCustomer === undefined) {
      return;
    }
    setEditCustomer({ ...editCustomer, email: email });
  };

  const saveChanges = () => {
    if (!Array.isArray(currentBookings)) {
      console.error("currentBookings is not an array");
      return alert("Is loading");
    }

    const bookingForSelectedTime = currentBookings.filter((existingBooking) => {
      return (
        existingBooking.date === editBooking?.date &&
        existingBooking.time === editBooking?.time
      );
    });

    if (bookingForSelectedTime.length >= 15) {
      alert("Det finns inga lediga tider, välj annan dag eller tid");
      return;
    }

    if (editBooking && editCustomer) {
      const transformedEditBooking = {
        ...editBooking,
        id: editBooking._id,
      };
      const transformedEditCustomer = {
        ...editCustomer,
        id: editCustomer._id,
      };

      axios
        .put(URL + "/booking/update/" + editBooking._id, transformedEditBooking)
        .then(() => {
          console.log("Booking updated successfully");
          axios
            .put(
              URL + "/customer/update/" + editCustomer._id,
              transformedEditCustomer
            )
            .then(() => {
              console.log("Customer updated successfully");
              window.confirm("Bokningen är ändrad!");
              navigate("/bookingInfo/" + transformedEditBooking.id);
            })
            .catch((error) => {
              console.log("Error updating customer", error);
            });
        })
        .catch((error) => {
          console.log("Error updating booking", error);
        });
    }
  };

  return (
    <>
      <br />
      <h2>Redigera Bokning</h2>
      <br />
      <div>
        <form>
          <input
            type="date"
            value={editBooking?.date || ""}
            onChange={setDateChecked}
          />
          <input
            value={editBooking?.numberOfGuests || ""}
            name="numberOfGuests"
            type="number"
            max="6"
            min="1"
            onChange={setGuests}
          ></input>
          <label htmlFor="time">18.00</label>
          <input
            type="radio"
            name="time"
            value="18.00"
            checked={editBooking?.time === "18.00"}
            onChange={setTimeChecked}
          />
          <label htmlFor="time">21.00</label>
          <input
            type="radio"
            name="time"
            value="21.00"
            checked={editBooking?.time === "21.00"}
            onChange={setTimeChecked}
          />
          <label>Förnamn: </label>
          <input
            type="text"
            placeholder="Namn"
            onChange={setName}
            value={editCustomer?.name || ""}
          />
          <label>Efternamn: </label>
          <input
            type="text"
            placeholder="Efternamn"
            onChange={setLastName}
            value={editCustomer?.lastname || ""}
          />
          <label>Telefon: </label>
          <input
            type="number"
            placeholder="Telefon"
            onChange={setPhone}
            value={editCustomer?.phone || ""}
          />
          <label>Email: </label>
          <input
            type="email"
            placeholder="Email"
            onChange={setEmail}
            value={editCustomer?.email || ""}
          />
        </form>
      </div>
      <br />
      {editBooking && (
        <button>
          <Link to={"/bookingInfo/" + editBooking._id}>Tillbaka</Link>
        </button>
      )}{" "}
      <button onClick={saveChanges}>
        <Link to="">Spara</Link>
      </button>
    </>
  );
};
