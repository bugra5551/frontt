import { CarSpecification } from "./car-specification.model";

export interface SpecificationDescription {
  specificationDescriptionId?: number;
  description: string;
  carSpecifications?: CarSpecification[];
  isDeleted: boolean;
}