import { Routes } from '@angular/router';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
          import('./next-predicted-orders/next-predicted-orders.component')
            .then(m => m.NextPredictedOrdersComponent),
    },
    {
        path: 'customer-orders/:customerName', // ruta con parámetro
        loadComponent: () => import('./customer-orders/customer-orders.component')
        .then(m => m.CustomerOrdersComponent)
    },
    {
        path: 'new-order/:customerName', // ruta con parámetro
        loadComponent: () => import('./new-order/new-order.component')
        .then(m => m.NewOrderComponent)
    },
];
