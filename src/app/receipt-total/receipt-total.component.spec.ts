import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptTotalComponent } from './receipt-total.component';

describe('ReceiptTotalsComponent', () => {
  let component: ReceiptTotalComponent;
  let fixture: ComponentFixture<ReceiptTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptTotalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReceiptTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
