import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:44338';

  constructor(private httpClient: HttpClient) { }

  registerCustomer(customer: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/Customer/Register`, customer);
  }
}
