export interface CarSpecificationCreateUpdate {
  carSpecificationId?: number;
  carId: number;
  specificationDescriptionId: number;
  isDeleted: boolean;
}