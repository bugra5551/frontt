import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../models/read/brand.model';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class BrandService {

  private apiUrl = 'https://localhost:44338';

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${this.apiUrl}/Brand/GetAll`);
  }
  addBrand(brand: Brand): Observable<Brand> {
    return this.httpClient.post<Brand>(`${this.apiUrl}/Brand/Add`, brand);
  }
  updateBrand(brand: Brand): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/Brand/Update`, brand);
  }
}
