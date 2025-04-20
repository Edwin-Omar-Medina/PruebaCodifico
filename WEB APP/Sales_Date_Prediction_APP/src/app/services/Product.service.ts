import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private apiUrl = 'http://localhost:5259/api/TotalProduct/ListTotalProduct';

  constructor(private http: HttpClient) {}

  // Método para obtener las órdenes
  getProducts(): Observable<any> {
    
    return this.http.get<any>(this.apiUrl).pipe(res=>res);
  }

  getProductById(productId: number): Observable<any> {
    const url = `http://localhost:5259/api/TotalProduct/GetListTotalProduct/${encodeURIComponent(productId)}`;
    return this.http.get<any>(url);
  }
}
