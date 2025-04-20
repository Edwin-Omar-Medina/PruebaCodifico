import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsertOrderService {
  
  
  constructor(private http: HttpClient) {}

  
  
  insertOrder(
    custid: number,
    empid: number,
    shipperid: number,
    orderdate: Date,
    requireddate: Date,
    shippeddate: Date,
    shipaddress: string,
    shipcity: string,
    shipname: string,
    shipcountry: string,
    freight: number,
    productid: number,
    qty: number,
    unitprice: number,
    discount: number
  ): Observable<any> {
    const url = 'http://localhost:5259/api/Orders/InsertOrderWithDetails/';
  
    const payload = {
      custid,
      empid,
      shipperid,
      orderdate,
      requireddate,
      shippeddate,
      shipaddress,
      shipcity,
      shipname,
      shipcountry,
      freight,
      productid,
      qty,
      unitprice,
      discount
    };
  
    return this.http.post<any>(url, payload);
  }






  
}

