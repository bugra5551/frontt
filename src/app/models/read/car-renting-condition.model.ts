import { Car } from './car.model';
import { RentingCondition } from './renting-condition.model';

export interface CarRentingCondition {
  carRentingConditionId: number;
  carId: number;
  car: Car;
  rentingConditionId: number;
  rentingCondition: RentingCondition;
  conditionValue: string;
  isDeleted: boolean;
}