import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOrdersService } from '../services/CustomerOrders.service';
import { CustomerOrdersInterface } from '../interfaces/customerorders.interface'
import { sortByColumn } from '../helpers/sort-helpers';
import { PaginatorHelper } from '../helpers/paginator-helpers';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent implements OnInit{

  // Paginación
  currentPage = 1;
  itemsPerPage = 10;
  readonly itemsPerPageOptions = [5, 10, 20, 50];  

  customerName = '';
  constructor(
    private route: ActivatedRoute,
    private apiService: CustomerOrdersService,
    private paginator: PaginatorHelper,
  ) {this.customerName = this.route.snapshot.paramMap.get('customerName') ?? '';}

  

  

  ngOnInit(): void {
    this.getCustomerOrders(this.customerName);
  }
  // Datos
    customerOrders: CustomerOrdersInterface[] = [];
    displayedOrders: CustomerOrdersInterface[] = [];
    
    // Ordenamiento
    sortColumn: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';
    
    // Búsqueda
    searchTerm: string = '';
    
    
    paginationText = '0-0 of 0';
  
  
    getCustomerOrders(customerName: string): void {

      
      this.apiService.getCustomerOrders(customerName).subscribe({
        next: (result) => {
          this.customerOrders = Array.isArray(result.response) ? result.response : [];
          this.currentPage = 1;
          this.updateDisplayedData();
          
        },
        error: (err) => {
          console.error('Search error:', err);
          this.customerOrders = [];
          this.updateDisplayedData();
        }
      });
    }
  
    sortBy(column: string): void {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
      
      this.customerOrders = sortByColumn([...this.customerOrders], column, this.sortDirection);
      this.currentPage = 1;
      this.updateDisplayedData();
    }
  
      
    // Métodos de paginación
    onItemsPerPageChange(event: Event): void {
      const select = event.target as HTMLSelectElement;
      
      this.itemsPerPage = Number(select.value);
      
      this.currentPage = 1;
      this.updateDisplayedData();
    }
  
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateDisplayedData();
      }
    }
  
    nextPage(): void {
      const totalPages = this.paginator.getTotalPages(this.customerOrders.length, this.itemsPerPage);
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.updateDisplayedData();
      }
    }
  
    private updateDisplayedData(): void {
      this.displayedOrders = this.paginator.getPaginatedItems(
        this.customerOrders,
        this.currentPage,
        this.itemsPerPage
      );
      this.paginationText = this.paginator.getDisplayText(
        this.currentPage,
        this.itemsPerPage,
        this.customerOrders.length
      );
    }

}
