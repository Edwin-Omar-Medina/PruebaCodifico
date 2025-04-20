import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesService } from '../services/Employees.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmployeesInterface } from '../interfaces/employees.interface';
import {ShippersInterface} from '../interfaces/shipper.interface'
import { ShippersService } from '../services/Shippers.service';
import { ViewChild, ElementRef } from '@angular/core';
import { ProductTotalInterface } from '../interfaces/producttotal.interface';
import { ProductsService } from '../services/Product.service';
import { ProductInterface } from '../interfaces/product.interface';
import { InsertOrderService } from '../services/insertorder.service';
import { CustomerOrdersService } from '../services/CustomerOrders.service';
import { CustomerOrdersInterface } from '../interfaces/customerorders.interface'
import { Console } from 'console';


@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent implements OnInit {

  @Input() customerName!: string;
  @Output() close = new EventEmitter<void>();

  @ViewChild('shipNameInput') shipNameInput!: ElementRef;
  @ViewChild('shipAddressInput') shipAddressInput!: ElementRef;
  @ViewChild('shipCountryInput') shipCountryInput!: ElementRef;
  @ViewChild('shipCityInput') shipCityInput!: ElementRef;
  @ViewChild('orderDateInput') orderDateInput!: ElementRef;
  @ViewChild('requiredDateInput') requiredDateInput!: ElementRef;
  @ViewChild('shippedDateInput') shippedDateInput!: ElementRef;
  @ViewChild('unitPrice') unitPrice!: ElementRef;
  @ViewChild('freightInput') freightInput!: ElementRef;
  @ViewChild('qtyInput') qtyInput!: ElementRef;
  @ViewChild('discountInput') discountInput!: ElementRef;

  closeModal() {
    this.close.emit();
  }

  EmployeesList: EmployeesInterface[] = []; //LISTADO DE EMPLEADOS
  ShipperList: ShippersInterface[] = []; //LISTADO DE EMPLEADOS
  productList: ProductInterface[] = []; //LISTADO DE PRODUCTOS
  productConsult: ProductTotalInterface[] = []; //consulta de product
  customerOrders: CustomerOrdersInterface[] = [];
  
  //CAMPOS PARA ENVIO
  custId: number = 0;
  selectedShipperId: number = 0;
  selectedEmployeeId: number = 0;
  selectedProductId: number = 0;
  shipnameInput: string = '';
  shipaddressInput: string = '';
  shipcountryInput: string = '';
  shipcityInput: string = '';
  unitprice: number = 0;
  orderdateInput: Date = new Date();
  requireddateInput: Date = new Date();
  shippeddateInput: Date = new Date();
  freightinput: number = 0;
  qtyinput: number = 0;
  discountinput: number = 0;



  constructor(
    private route: ActivatedRoute,
    private employeesservice: EmployeesService,
    private shipperservice:ShippersService,
    private productservice:ProductsService,
    private insertorderservice: InsertOrderService,
    private apiService: CustomerOrdersService,
      
    ) {this.customerName = this.route.snapshot.paramMap.get('customerName') ?? '';}

    ngOnInit(): void {
      //this.itemsPerPage = 10;
      this.getEmployees();
      this.getShippers();
      this.getProducts();
     this.getidcustomer ();
    }

    //TOMAR DATA DE FORM
    getDataForm(): void {
      this.shipnameInput = this.shipNameInput.nativeElement.value;
      this.shipaddressInput = this.shipAddressInput.nativeElement.value;
      this.shipcountryInput = this.shipCountryInput.nativeElement.value;
      this.shipcityInput = this.shipCityInput.nativeElement.value;
      this.orderdateInput = this.orderDateInput.nativeElement.value;
      this.requireddateInput = this.requiredDateInput.nativeElement.value;
      this.shippeddateInput = this.shippedDateInput.nativeElement.value;
      this.freightinput = this.freightInput.nativeElement.value;
      this.qtyinput = this.qtyInput.nativeElement.value;
      this.discountinput = this.discountInput.nativeElement.value;

      
      

        console.log(this.custId,
          this.selectedEmployeeId,
          this.selectedShipperId,
          this.orderdateInput,
          this.requireddateInput,
          this.shippeddateInput,
          this.shipaddressInput,
          this.shipcityInput,
          this.shipnameInput,
          this.shipcountryInput,
          this.freightinput,
          this.selectedProductId,
          this.qtyinput,
          this.unitprice,
          this.discountinput)
        this.save();
      
      
    }

    //GUARDAR DATA
    save() {
      this.insertorderservice.insertOrder(
        this.custId,
        this.selectedEmployeeId,
        this.selectedShipperId,
        this.orderdateInput,
        this.requireddateInput,
        this.shippeddateInput,
        this.shipaddressInput,
        this.shipcityInput,
        this.shipnameInput,
        this.shipcountryInput,
        this.freightinput,
        this.selectedProductId,
        this.qtyinput,
        this.unitprice,
        this.discountinput
      ).subscribe({
        next: (response) => {
          console.log(response);
          alert("ORDEN GUARDADA EXITOSAMENTE");
        },
        error: (err) => {
          console.error('Error saving order:', err);
          alert(err)
        }
      });
    }

    getidcustomer (): void {
      this.apiService.getCustomerOrders(this.customerName).subscribe({
        next: (result) => {
          this.customerOrders = Array.isArray(result.response) ? result.response : [];
          this.custId = this.customerOrders[0]?.custid ?? null;
        },
        error: (err) => {
          //console.error('Search error:', err);
          this.customerOrders = [];
        }
      });
    }


    


    //MOSTRAR LISTADO DE EMPLEADOS
    getEmployees(): void {
      this.employeesservice.getEmployees().subscribe({
        next: (result) => {
          this.EmployeesList = Array.isArray(result.response) ? result.response : [];
         
        },
        error: (err) => {
          //console.error('Error loading orders:', err);
          this.EmployeesList = [];
         
        }
      });
    }

    onEmployeeSelect(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      this.selectedEmployeeId = Number(selectElement.value);
      
    }


    //MOSTRAR LISTADO DE SHIPPERS
    getShippers(): void {
      this.shipperservice.getShippers().subscribe({
        next: (result) => {
          this.ShipperList = Array.isArray(result.response) ? result.response : [];
          
        },
        error: (err) => {
          //console.error('Error loading orders:', err);
          this.ShipperList = [];
        }
      });
    }

    onShipperSelect(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      this.selectedShipperId = Number(selectElement.value);
      
    }


    //MOSTRAR LISTADO DE PRODUCTOS
    getProducts(): void {
      this.productservice.getProducts().subscribe({
        next: (result) => {
          this.productList = Array.isArray(result.response) ? result.response : [];
        },
        error: (err) => {
          //console.error('Error loading orders:', err);
          this.productList = [];
        }
      });
    }

    onProductSelect(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      this.selectedProductId = Number(selectElement.value);
      console.log("el id del producto: "+ this.selectedProductId)
      this.ConsultProducts(this.selectedProductId)
    }



    ConsultProducts(ID:number): void {
      this.productservice.getProductById(ID).subscribe({
        next: (result) => {
          this.productConsult = Array.isArray(result.response) ? result.response : [];
          this.unitprice = this.productConsult[0]?.unitprice ?? null;
        },
        error: (err) => {
          //console.error('Error loading orders:', err);
          this.productConsult = [];
        }
      });
    }

}