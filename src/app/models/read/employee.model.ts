import { User } from './user.model';
import { Reservation } from './reservation.model';

export interface Employee extends User {
  employeeId: number;
  jobTitle: string;
  reservations: Reservation[];
  isDeleted: boolean;
}