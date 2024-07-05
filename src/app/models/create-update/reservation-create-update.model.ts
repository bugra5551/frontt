export interface ReservationCreateUpdate {
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
  isDeleted: boolean;
  paymentId: number;
}