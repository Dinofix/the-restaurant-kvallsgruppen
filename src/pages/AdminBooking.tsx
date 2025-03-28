import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { URL, restaurantId } from "../services/RestaurantService";
import axios from "axios";
import { IBooking } from "../models/IBooking";

export const AdminBooking = () => {
  const [currentBookings, setCurrentBookings] = useState<IBooking[]>();

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

  const [date, setDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const handleGuests = (e: ChangeEvent<HTMLInputElement>) => {
    let guests = parseInt(e.target.value, 10);
    if (isNaN(guests) || guests < 1 || guests > 6) {
      return;
    }
    setNumberOfGuests(e.target.value);
  };

  const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.value.trim();
    if (/^[A-Za-z\s]{0,20}$/.test(name)) {
      setName(name);
    } else {
      console.error("Invalid name");
    }
  };

  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    let lastName = e.target.value.trim();
    if (/^[A-Za-z\s]{0,30}$/.test(lastName)) {
      setLastName(lastName);
    } else {
      console.error("Invalid lastName");
    }
  };

  const handlePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    let phone = e.target.value.trim();
    if (/^\d{0,20}$/.test(phone)) {
      setPhone(phone);
    } else {
      console.error("Invalid phone");
    }
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let email = e.target.value.trim();
    setEmail(email);
  };

  const handleClick = () => {
    if (
      !date ||
      !numberOfGuests ||
      !time ||
      !name ||
      !lastName ||
      !phone ||
      !email
    ) {
      alert("Fyll i alla fält!");

      return;
    } else {
      if (!Array.isArray(currentBookings)) {
        console.error("currentBookings is not an array");
        return alert("Is loading");
      }

      const bookingForSelectedTime = currentBookings.filter(
        (existingBooking) => {
          return existingBooking.date === date && existingBooking.time === time;
        }
      );

      if (bookingForSelectedTime.length >= 15) {
        alert("Det finns inga lediga tider, välj annan dag eller tid");
        return;
      }

      window.confirm("Är du helt säker på att du vill göra denna bokning?");
      const bookingData = {
        restaurantId,
        date,
        numberOfGuests,
        time,
        customer: {
          name,
          lastName,
          phone,
          email,
        },
      };

      axios
        .post(URL + "/booking/create/", bookingData)
        .then((response) => {
          console.log("Booking successful:", response.data);
          setDate("");
          setNumberOfGuests("");
          setTime("");
          setName("");
          setLastName("");
          setPhone("");
          setEmail("");
          window.confirm("Bokningen är slutförd!");
        })
        .catch((error) => {
          console.error("Error during booking:", error);
        });
    }
  };
  return (
    <>
      <br />
      <h2>Admin Bokning</h2>
      <form>
        <input
          id="dateInput"
          type="date"
          value={date}
          onChange={handleDate}
          required
        />
        <input
          id="guestInput"
          value={numberOfGuests}
          name="numberOfGuests"
          type="number"
          placeholder="Antal gäster (1 - 6)"
          onChange={handleGuests}
        ></input>
        <label htmlFor="time">18.00</label>
        <input
          id="timeInput"
          type="radio"
          name="time"
          value="18.00"
          checked={time === "18.00"}
          onChange={handleTime}
        />
        <label htmlFor="time">21.00</label>
        <input
          id="timeInput"
          type="radio"
          name="time"
          value="21.00"
          checked={time === "21.00"}
          onChange={handleTime}
        />
        <label>Förnamn: </label>
        <input
          onChange={handleName}
          type="text"
          placeholder="Namn"
          value={name}
        />
        <label>Efternamn: </label>
        <input
          onChange={handleLastName}
          type="text"
          placeholder="Efternamn"
          value={lastName}
        />
        <label>Telefon: </label>
        <input
          onChange={handlePhoneNumber}
          type="number"
          placeholder="Telefonnummer"
          value={phone}
        />
        <label>Email: </label>
        <input
          onChange={handleEmail}
          type="email"
          placeholder="Email"
          value={email}
        />
      </form>
      <br />
      <button>
        <Link to={"/Admin"}>Tillbaka</Link>
      </button>
      <button onClick={handleClick}>
        <Link to="">Boka</Link>
      </button>
    </>
  );
};
