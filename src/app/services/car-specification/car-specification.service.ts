import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarSpecificationCreateUpdate } from '../../models/create-update/car-specification-create-update.model';

@Injectable(
  {
    providedIn:'root'
  }
)
export class CarSpecificationService  {

  private apiUrl = 'https://localhost:44338';

  constructor(private httpClient: HttpClient) { }

  addCarSpecification(carSpec: CarSpecificationCreateUpdate): Observable<CarSpecificationCreateUpdate> {
    return this.httpClient.post<CarSpecificationCreateUpdate>(`${this.apiUrl}/CarSpecification/Add`, carSpec);
  }

}