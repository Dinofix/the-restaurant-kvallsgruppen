import { useState } from "react";
import { Calendar } from "./Calendar";
import { Guests } from "./NumberGuests";
import { SetTime } from "./SetTime";
import { IBookingCheck } from "../models/IBookingCheck";
import { IBooking } from "../models/IBooking";
import axios from "axios";
import { URL, restaurantId } from "../services/RestaurantService";
import { StyledButtonSubmit } from "../Style/StyledButton";
import { FormBooking } from "./Form";
import { IBookingCreate } from "../models/IBookinCreate";
import { BookingCompleted } from "./BookingCompleted";
import { useNavigate } from "react-router-dom";

export const Booking = () => {
  const [currentBookings, setCurrentBookings] = useState<IBooking[] | null>(
    null
  );
  const [booking, setBooking] = useState<IBookingCheck>({
    restaurantId: "65c89584cbb6491fd64e9a7a",
    date: "",
    time: "",
    numberOfGuests: 0,
  });

  const [createBooking, setCreateBooking] = useState<IBookingCreate>({
    restaurantId: "65c89584cbb6491fd64e9a7a",
    date: "",
    time: "",
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });

  const [showForm, setShowForm] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };
  console.log("Här",isChecked)

  if (!currentBookings) {
    axios
      .get<IBooking[]>(URL + "/booking/restaurant/" + restaurantId)
      .then((response) => {
        console.log(response.data);
        setCurrentBookings(response.data);
      })
      .catch((error) => {
        console.log("Error vid hämtning", error);
      });
  }

  const setTime = (newTime: string) => {
    setBooking((prevBooking) => ({ ...prevBooking, time: newTime }));
    setCreateBooking((prevBooking) => ({ ...prevBooking, time: newTime }));
  };
  const setDate = (newDate: string) => {
    setBooking((prevBooking) => ({ ...prevBooking, date: newDate }));
    setCreateBooking((prevBooking) => ({ ...prevBooking, date: newDate }));
  };
  const setGuests = (newGuests: number) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      numberOfGuests: newGuests,
    }));
    setCreateBooking((prevBooking) => ({
      ...prevBooking,
      numberOfGuests: newGuests,
    }));
  };

  const setName = (name: string) => {
    setCreateBooking((prevBooking) => ({
      ...prevBooking,
      customer: { ...prevBooking.customer, name },
    }));
  };

  const setLastName = (lastname: string) => {
    setCreateBooking((prevBooking) => ({
      ...prevBooking,
      customer: { ...prevBooking.customer, lastname },
    }));
  };

  const setEmail = (email: string) => {
    setCreateBooking((prevBooking) => ({
      ...prevBooking,
      customer: { ...prevBooking.customer, email },
    }));
  };

  const setPhone = (phone: string) => {
    setCreateBooking((prevBooking) => ({
      ...prevBooking,
      customer: { ...prevBooking.customer, phone },
    }));
  };

  const CheckAvailability = () => {
    if (!booking.date || !booking.time || booking.numberOfGuests === 0) {
      alert("Fyll i alla fält!");
      return;
    }

    if (!Array.isArray(currentBookings)) {
      console.error("currentBookings is not an array");
      return alert("Is loading");
    }
    const bookingForSelectedTime = currentBookings.filter((existingBooking) => {
      return (
        existingBooking.date === booking.date &&
        existingBooking.time === booking.time
      );
    });

    if (bookingForSelectedTime.length >= 15) {
      alert("Det finns inga lediga tider, välj annan dag eller tid");
      return;
    } else {
      setShowForm(true);
    }
  };

  const handleBookingNow = async () => {
    if (
      !createBooking.customer.name ||
      !createBooking.customer.lastname ||
      !createBooking.customer.email ||
      !createBooking.customer.phone ||
      !isChecked
    ) {
      alert("Fyll i alla fält!");
      return;
    } else {
      try {
        const response = await axios.post(
          "https://school-restaurant-api.azurewebsites.net/booking/create",
          createBooking
        );
        const newBooking = response.data;
        console.log("Bokning genomförd:", newBooking);
        setCreateBooking(newBooking);
        setIsChecked(false);
        setShowForm(false);
        navigate("/bokningsBekraftelse");
        console.log(createBooking);
      } catch (error) {
        console.error("Fel vid sidhämtning", error);
      }
    }
  };

  const goBack = () => {
    setShowForm(false);
  };

  return (
    <div className="mainDiv">
      {!showForm && (
        <div>
          <Guests onGuestsString={setGuests} />
          <Calendar  onDateString={setDate} />
          <SetTime onTimeString={setTime} />
          <StyledButtonSubmit onClick={CheckAvailability}>
            Kolla om lediga tider:
          </StyledButtonSubmit>
          <h3>Dina val:</h3>
        </div>
      )}

      <div className="mainDiv">
        {showForm && (
          <FormBooking
          
          customer={{...createBooking.customer, _id: ""}}
            onCheckboxChange={handleCheckboxChange}
            onNameString={setName}
            onLastNameString={setLastName}
            onEmailString={setEmail}
            onPhoneString={setPhone}
          />
        )}
        {showForm && (
          <StyledButtonSubmit onClick={handleBookingNow}>
            Boka Nu
          </StyledButtonSubmit>
        )}
        {showForm && (
          <StyledButtonSubmit onClick={goBack}>Välj ny tid</StyledButtonSubmit>
        )}
      </div>
      <div className="mainDiv">
        <BookingCompleted createBooking={createBooking} />
      </div>
    </div>
  );
};
