import { Car } from './car.model';

export interface CarDamageDetail {
  damageDetailId: number;
  carId: number;
  car: Car;
  damageDate: Date;
  description: string;
  repairCost: number;
  isDeleted: boolean;
}