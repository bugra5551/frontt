import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../../models/read/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    private apiUrl = 'https://localhost:44338';

  constructor(private http: HttpClient) {}

  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/Payment/Add`, payment);
  }
}
