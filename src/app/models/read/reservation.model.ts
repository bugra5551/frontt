import { Car } from './car.model';
import { Customer } from './customer.model';
import { Payment } from './payment.model';

export interface Reservation {
  reservationId?: number;
  customerId: number;
  carId: number;
  reservationDate: Date;
  pickUpDate: Date;
  pickUpLocation: number;
  dropOffDate: Date;
  dropOffLocation: number;
  totalPrice: number;
  status: string;
  customer?: Customer;
  car?: Car;
  payment?: Payment;
  isDeleted: boolean;
  paymentId: number;
}