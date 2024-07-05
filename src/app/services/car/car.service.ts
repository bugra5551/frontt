import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../../models/read/car.model';
import { Observable } from 'rxjs';
import { CarCreateUpdate } from '../../models/create-update/car-create-update.model';

@Injectable(
  {
    providedIn:'root'
  }
)
export class CarService {

  private apiUrl = 'https://localhost:44338';

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.apiUrl}/Car/GetAll`);
  }

  getByCarId(carId: number): Observable<Car> {
    return this.httpClient.get<Car>(`${this.apiUrl}/Car/GetByCarId/${carId}`);
  }

  addCar(car: CarCreateUpdate): Observable<CarCreateUpdate> {
    return this.httpClient.post<CarCreateUpdate>(`${this.apiUrl}/Car/Add`, car);
  }

  updateCar(car: CarCreateUpdate): Observable<CarCreateUpdate> {
    return this.httpClient.put<CarCreateUpdate>(`${this.apiUrl}/Car/Update`, car);
  }
}