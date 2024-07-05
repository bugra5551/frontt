import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecificationDescription } from '../../models/read/specification-description.model';

@Injectable(
  {
    providedIn:'root'
  }
)
export class SpecificationDescriptionService {

  private apiUrl = 'https://localhost:44338';

  constructor(private httpClient: HttpClient) { }

  getSpecificationDescriptions(): Observable<SpecificationDescription[]> {
    return this.httpClient.get<SpecificationDescription[]>(`${this.apiUrl}/SpecificationDescription/GetAll`);
  }
  addSpecificationDescriptions(specificationDescription: SpecificationDescription): Observable<SpecificationDescription> {
    return this.httpClient.post<SpecificationDescription>(`${this.apiUrl}/SpecificationDescription/Add`, specificationDescription);
  }
  updateSpecificationDescriptions(specificationDescription: SpecificationDescription): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/SpecificationDescription/Update`, specificationDescription);
  }
}
