import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  private apiUrl = 'http://localhost:5259/api/Employees/ListEmployees';

  constructor(private http: HttpClient) {}

  // Método para obtener las órdenes
  getEmployees(): Observable<any> {
    
    return this.http.get<any>(this.apiUrl).pipe(res=>res);
  }
}
