import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentingCondition } from '../../models/read/renting-condition.model';

@Injectable(
  {
    providedIn:'root'
  }
)
export class RentingConditionService {

  private apiUrl = 'https://localhost:44338';

  constructor(private httpClient: HttpClient) { }

  getRentingConditions(): Observable<RentingCondition[]> {
    return this.httpClient.get<RentingCondition[]>(`${this.apiUrl}/RentingCondition/GetAll`);
  }
  addRentingCondition(rentingCondition: RentingCondition): Observable<RentingCondition> {
    return this.httpClient.post<RentingCondition>(`${this.apiUrl}/RentingCondition/Add`, rentingCondition);
  }
  updateRentingCondition(rentingCondition: RentingCondition): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/RentingCondition/Update`, rentingCondition);
  }
}
