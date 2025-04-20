// paginator-helpers.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaginatorHelper {
  getPaginatedItems<T>(items: T[], currentPage: number, itemsPerPage: number): T[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return items.slice(startIndex, endIndex);
  }

  getTotalPages(totalItems: number, itemsPerPage: number): number {
    console.log(Math.ceil(totalItems / itemsPerPage) || 1)
    return Math.ceil(totalItems / itemsPerPage) || 1;
  }

  getDisplayText(currentPage: number, itemsPerPage: number, totalItems: number): string {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    return `${startItem}-${endItem} of ${totalItems}`;
  }


  
}