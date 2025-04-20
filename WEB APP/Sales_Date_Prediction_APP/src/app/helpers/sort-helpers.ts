export function sortByColumn<T>(data: T[], column: string, direction: 'asc' | 'desc'): T[] {
    return [...data].sort((a: any, b: any) => {
      let valueA = a[column];
      let valueB = b[column];
  
      if (column === 'lastOrderDate' || column === 'nextPredictedOrder1') {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
  
        if (isNaN(valueA.getTime())) valueA = new Date(0);
        if (isNaN(valueB.getTime())) valueB = new Date(0);
  
        return direction === 'asc'
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      }
  
      if (!isNaN(valueA) && !isNaN(valueB)) {
        // Ambos valores son numéricos
        return direction === 'asc'
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
        // Ambos son cadenas de texto
        return direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        // En caso de tipos mixtos o no esperados
        return 0;
      }
  
      return 0;
    });
  }