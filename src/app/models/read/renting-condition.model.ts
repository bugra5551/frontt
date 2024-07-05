import { CarRentingCondition } from './car-renting-condition.model';

export interface RentingCondition {
  rentingConditionId?: number;
  rentingConditionName: string;
  rentingConditionDescription: string;
  carRentingConditions?: CarRentingCondition[];
  isDeleted: boolean;
}