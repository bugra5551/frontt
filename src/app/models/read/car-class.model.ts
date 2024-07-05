import { Car } from './car.model';

export interface CarClass {
  carClassId?: number;
  carClassDescription: string;
  cars?: Car[];
  isDeleted: boolean;
}