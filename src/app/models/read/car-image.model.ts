import { Car } from './car.model';

export interface CarImage {
  carImageId: number;
  carId: number;
  car: Car;
  imageData: string;  // byte[] yerine Uint8Array kullanıyoruz
  isDeleted: boolean;
}
