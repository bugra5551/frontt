import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarRentingConditionCreateUpdate } from '../../models/create-update/car-renting-condition-create-update.model';

@Injectable(
  {
    providedIn:'root'
  }
)
export class CarRentingConditionService  {

  private apiUrl = 'https://localhost:44338';

  constructor(private httpClient: HttpClient) { }

  addCarRentingConditions(carRentingCondition: CarRentingConditionCreateUpdate): Observable<CarRentingConditionCreateUpdate> {
    return this.httpClient.post<CarRentingConditionCreateUpdate>(`${this.apiUrl}/CarRentingCondition/Add`, carRentingCondition);
  }

}