
import { IBookingCreate } from "../models/IBookinCreate";


export interface IMyBooking{
createBooking: IBookingCreate | null;
}

export const BookingCompleted= (props:  IMyBooking)=>{
console.log(props.createBooking)
  


return(
    <>

    <div className="DinaVal">
        <p>{props.createBooking?.customer.name} {props.createBooking?.customer.lastname}</p>
        <p> {props.createBooking?.date} Tid: {props.createBooking?.time}</p>
        <p>Antal gäster: {props.createBooking?.numberOfGuests}</p>
    </div>
 
</>
)

}