import { Car } from './car.model';
import { Reservation } from './reservation.model';

export interface Location {
  locationId?: number;
  locationName: string;
  address: string;
  city: string;
  country: string;
  isDeleted: boolean;
 /* cars?: Car[];
  pickUpReservations?: Reservation[];
  dropOffReservations?: Reservation[];*/
}