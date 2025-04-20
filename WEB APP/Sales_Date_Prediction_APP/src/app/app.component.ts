import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NextPredictedOrdersComponent } from './next-predicted-orders/next-predicted-orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NextPredictedOrdersComponent,HttpClientModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sales_Date_Prediction_APP';
}
