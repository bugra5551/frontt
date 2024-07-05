import { User } from './user.model';
import { Reservation } from './reservation.model';

export interface Customer extends User {
  customerId: number;
  driverLicenseNumber: string;
  reservations: Reservation[];
  isDeleted: boolean;
}