import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextPredictedOrdersComponent } from './next-predicted-orders.component';

describe('NextPredictedOrdersComponent', () => {
  let component: NextPredictedOrdersComponent;
  let fixture: ComponentFixture<NextPredictedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextPredictedOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextPredictedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
