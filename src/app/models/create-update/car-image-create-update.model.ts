export interface CarImageCreateUpdate {
    carImageId?: number;
    carId: number;
    imageData: string;
    isDeleted: boolean;
}