import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrdersService {
  
  
  constructor(private http: HttpClient) {}

  
  getCustomerOrders(customerName: string): Observable<any> {
    const url = `http://localhost:5259/api/CustomerOrder/GetCustomerOrder/${encodeURIComponent(customerName)}`;
    return this.http.get<any>(url).pipe(res=>res);
  }

}