import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelpDesk } from '../../models/read/help-desk.model';
import { HelpDeskCreateUpdate } from '../../models/create-update/help-desk-create-update.model';

@Injectable({
  providedIn: 'root'
})
export class HelpDeskService {
  private apiUrl = 'https://localhost:44338';

  constructor(private http: HttpClient) {}

  getMessagesByCarIdAndUserId(carId: number, userId: number): Observable<HelpDesk[]> {
    return this.http.get<HelpDesk[]>(`${this.apiUrl}/HelpDesk/GetMessages/${carId}/${userId}`);
  }

  getAllMessagesByCarId(carId: number): Observable<HelpDesk[]> {
    return this.http.get<HelpDesk[]>(`${this.apiUrl}/HelpDesk/GetMessagesByCarId/${carId}`);
  }

  addMessage(message: HelpDeskCreateUpdate): Observable<HelpDeskCreateUpdate> {
    return this.http.post<HelpDeskCreateUpdate>(`${this.apiUrl}/HelpDesk/SendMessage`, message);
  }
}