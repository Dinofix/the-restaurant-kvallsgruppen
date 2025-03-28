import { IBookingExt } from "./IBookingExt";

export interface IBooking {
  _id: string;
  restaurantId: string;
  date: string;
  time: string;
  numberOfGuests: number;
  customerId: IBookingExt
}
