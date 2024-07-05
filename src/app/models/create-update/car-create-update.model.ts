export interface CarCreateUpdate{
    carId?: number;
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
}