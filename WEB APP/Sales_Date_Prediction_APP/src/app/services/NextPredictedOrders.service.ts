import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NextPredictedOrdersService {
  
  private apiUrl = 'http://localhost:5259/api/NextPredictedOrders/ListNextPredictedOrders';

  constructor(private http: HttpClient) {}

  // Método para obtener las órdenes
  getOrders(): Observable<any> {
    
    return this.http.get<any>(this.apiUrl).pipe(res=>res);
  }

  getOrdersByCustomerName(customerName: string): Observable<any> {
    const url = `http://localhost:5259/api/NextPredictedOrders/GetNextPredictedOrders/${encodeURIComponent(customerName)}`;
    return this.http.get<any>(url);
  }
}
