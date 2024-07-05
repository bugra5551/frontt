import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarClass } from '../../models/read/car-class.model';

@Injectable(
  {
    providedIn:'root'
  }
)
export class CarClassService {

  private apiUrl = 'https://localhost:44338';

  constructor(private httpClient: HttpClient) { }

  getCarClasses(): Observable<CarClass[]> {
    return this.httpClient.get<CarClass[]>(`${this.apiUrl}/CarClass/GetAll`);
  }
  addCarClass(carClass: CarClass): Observable<CarClass> {
    return this.httpClient.post<CarClass>(`${this.apiUrl}/CarClass/Add`, carClass);
  }
  updateCarClass(carClass: CarClass): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/CarClass/Update`, carClass);
  }
}