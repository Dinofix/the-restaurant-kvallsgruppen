import { ChangeEvent, FormEvent, useState } from "react";
import { IBookingExt } from "../models/IBookingExt";

export interface ICustomerProps {
  onNameString: (newName: string) => void;
  onLastNameString: (newLastName: string) => void;
  onPhoneString: (newPhone: string) => void;
  onEmailString: (newEmail: string) => void;
  onCheckboxChange: () => void;
  customer: IBookingExt
 
}
export const FormBooking = (props: ICustomerProps) => {
 


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
   
    props.onNameString(e.target.value);
  };
  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
   
    props.onLastNameString(e.target.value);
  };
  const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
   
    props.onPhoneString(e.target.value);
    props.onCheckboxChange();
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    
    props.onEmailString(e.target.value);
  };

  const handleCheckboxChange = () => {
   
    props.onCheckboxChange();
  };

  return (
    <>
      <h2>Grattis det finns ett ledigt bord!</h2>
      <p>Fyll i formuläret och slutför bokningen:</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChangeName}
          type="text"
          className="input"
          placeholder="Namn"
          value={props.customer.name}
        />
        <input
          onChange={handleChangeLastName}
          type="text"
          className="input"
          placeholder="Efternamn"
          value={props.customer.lastname}
        />
        <input
          onChange={handleChangePhoneNumber}
          className="input"
          type="number"
          placeholder="Telefonnummer"
          value={props.customer.phone}
        />
        <input
          onChange={handleChangeEmail}
          type="email"
          className="input"
          placeholder="Email"
          value={props.customer.email}
        />
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          
          required
        />
        <label>
          Jag samtycker till att mina personuppgifter som anges i detta formulär
          används för att hantera min bokning på denna restaurang. Jag förstår
          att mina uppgifter kan användas för att kontakta mig angående min
          bokning och för att administrera mitt besök. Jag har läst och
          accepterat restaurangens integritetspolicy.
        </label>
      </form>
    </>
  );
};
