export interface Payment {
  paymentId?: number;
  paymentDate: Date;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  isDeleted: boolean;
}