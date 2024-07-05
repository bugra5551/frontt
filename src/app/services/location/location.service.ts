import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../models/read/location.model';

@Injectable(
  {
    providedIn:'root'
  }
)
export class LocationService {

  private apiUrl = 'https://localhost:44338';

  constructor(private httpClient: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(`${this.apiUrl}/Location/GetAll`);
  }
  addLocation(location: Location): Observable<Location> {
    return this.httpClient.post<Location>(`${this.apiUrl}/Location/Add`, location);
  }
  updateLocation(location: Location): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/Location/Update`, location);
  }
}
