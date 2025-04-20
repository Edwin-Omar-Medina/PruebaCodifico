// next-predicted-orders.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextPredictedOrdersService } from '../services/NextPredictedOrders.service';
import { NextPredictedOrdersInterface } from '../interfaces/nextpredictedorders.interface';
import { sortByColumn } from '../helpers/sort-helpers';
import { PaginatorHelper } from '../helpers/paginator-helpers';
import { RouterModule } from '@angular/router';
import { NewOrderComponent } from '../new-order/new-order.component';


@Component({
  selector: 'app-next-predicted-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, NewOrderComponent],
  templateUrl: './next-predicted-orders.component.html',
  styleUrls: ['./next-predicted-orders.component.css']
})
export class NextPredictedOrdersComponent implements OnInit {
  // Datos
  customerOrders: NextPredictedOrdersInterface[] = [];
  displayedOrders: NextPredictedOrdersInterface[] = [];
  
  // Ordenamiento
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Búsqueda
  searchTerm: string = '';
  
  // Paginación
  currentPage = 1;
  itemsPerPage = 10;
  readonly itemsPerPageOptions = [5, 10, 20, 50];
  paginationText = '0-0 of 0';

  constructor(
    private apiService: NextPredictedOrdersService,
    private paginator: PaginatorHelper
  ) {}

  ngOnInit(): void {
    this.itemsPerPage = 10;
    this.getCustomerOrders();
  }

  getCustomerOrders(): void {
    this.apiService.getOrders().subscribe({
      next: (result) => {
        this.customerOrders = Array.isArray(result.response) ? result.response : [];
        this.updateDisplayedData();
      },
      error: (err) => {
        console.error('Error loading orders:', err);
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

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim();
    
    if (!value) {
      this.getCustomerOrders();
      return;
    }

    this.apiService.getOrdersByCustomerName(value).subscribe({
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


  //prueba modal

  selectedCustomerName: string | null = null;

openNewOrderModal(customerName: string): void {
  this.selectedCustomerName = customerName;
}

closeNewOrderModal(): void {
  this.selectedCustomerName = null;
}

  
}