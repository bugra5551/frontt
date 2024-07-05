import { CarClass } from './car-class.model';
import { CarDamageDetail } from './car-damage-detail.model';
import { CarImage } from './car-image.model';
import { CarRentingCondition } from './car-renting-condition.model';
import { CarSpecification } from './car-specification.model';
import { Location } from './location.model';
import { Model } from './model.model';
import { Reservation } from './reservation.model';

export interface Car{
    carId: number;
    licensePlate: string;
    carClassId: number;
    gearshift: boolean;
    passengers: number;
    bags: number;
    modelId: number;
    doors: number;
    year: number;
    color: string;
    dailyPrice: number;
    status: string;
    fuelType: string;
    carType: string;
    km: number;
    chassisNo: string;
    locationId: number;
    isDeleted: boolean;
    model: Model;
    carClass : CarClass;
    location : Location;
    reservations: Reservation[];
    carSpecifications: CarSpecification[];
    carRentingConditions: CarRentingCondition[];
    carDamageDetails: CarDamageDetail[];
    carImages?: CarImage[];
    firstImage?: string;
    userId?: number;
}