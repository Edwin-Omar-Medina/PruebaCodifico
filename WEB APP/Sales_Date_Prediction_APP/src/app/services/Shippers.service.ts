import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {
  
  private apiUrl = 'http://localhost:5259/api/TotalShipper/ListTotalShippers';

  constructor(private http: HttpClient) {}

  // Método para obtener las órdenes
  getShippers(): Observable<any> {
    
    return this.http.get<any>(this.apiUrl).pipe(res=>res);
  }
}
