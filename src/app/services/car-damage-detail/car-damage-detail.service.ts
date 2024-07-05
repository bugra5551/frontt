import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDamageDetailCreateUpdate } from '../../models/create-update/car-damage-detail-create-update.model';

@Injectable({
  providedIn: 'root'
})
export class CarDamageDetailService {
  private baseUrl = 'https://localhost:44338';

  constructor(private http: HttpClient) { }

  addCarDamageDetail(damageDetail: CarDamageDetailCreateUpdate): Observable<CarDamageDetailCreateUpdate> {
    return this.http.post<CarDamageDetailCreateUpdate>(`${this.baseUrl}/CarDamageDetail/Add`, damageDetail);
  }
}
