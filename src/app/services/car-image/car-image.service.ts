import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../../models/read/car-image.model';
import { CarImageCreateUpdate } from '../../models/create-update/car-image-create-update.model';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CarImageService {

  private apiUrl = 'https://localhost:44338';

  constructor(private httpClient: HttpClient) { }

  getCarImages(carId: number): Observable<CarImage[]> {
    return this.httpClient.get<CarImage[]>(`${this.apiUrl}/CarImage/GetImagesByCarId/${carId}`);
  }

  getFirstCarImage(carId: number): Observable<string> {
    return this.httpClient.get<string>(`${this.apiUrl}/CarImage/GetFirstImageByCarId/${carId}`, { responseType: 'text' as 'json' });
  }

  addCarImages(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/CarImage/Add`, formData);
  }
}