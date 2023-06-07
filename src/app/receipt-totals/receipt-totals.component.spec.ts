import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptTotalsComponent } from './receipt-totals.component';

describe('ReceiptTotalsComponent', () => {
  let component: ReceiptTotalsComponent;
  let fixture: ComponentFixture<ReceiptTotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptTotalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
