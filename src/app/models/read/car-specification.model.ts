import { Car } from './car.model';
import { SpecificationDescription } from './specification-description.model';

export interface CarSpecification {
  carSpecificationId: number;
  carId: number;
  car: Car;
  specificationDescriptionId: number;
  specificationDescription: SpecificationDescription;
  isDeleted: boolean;
}