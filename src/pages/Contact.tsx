import axios from "axios";
import { IRestaurant } from "../models/IRestaurant";
import "./../styles/_contact.scss";
import { URL, restaurantId } from "../services/RestaurantService";
import { useState } from "react";

export const Contact = () => {
  const [contactInfo, setContactInfo] = useState<IRestaurant>();

  if (!contactInfo) {
    axios.get(URL + "/restaurant/" + restaurantId).then((response) => {
      setContactInfo(response.data[0]);
    });
  }

  return (
    <div className="contact-section">
      <h2>Kontakt</h2>

      <div className="contact-info">
        <div className="contact-item">
          <h3>Telefon</h3>
          <p>+46 12 345 56 78</p>
        </div>
        <div className="contact-item">
          <h3>Mejla oss</h3>
          <p>hej@{contactInfo?.name}.com</p>
        </div>
        <div className="contact-item">
          <h3>Öppettider</h3>
          <p>Måndag - Söndag</p>
          <p>18 - 00</p>
        </div>
        <div className="contact-item">
          <h3> Address</h3>
          <p>
            {contactInfo?.address}
            {", "}
            {contactInfo?.zip}
            {", "}
            {contactInfo?.city}
          </p>
        </div>
      </div>
    </div>
  );
};
