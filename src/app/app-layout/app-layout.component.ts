import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LineItemComponent } from '../line-item/line-item.component';
import { ILineItem } from '../line-item/line-item.interface';
import { WaysToSplit } from '../shared/WaysToSplitEnum';
import { Observable } from 'rxjs';
import { ReceiptTotals } from '../receipt-total/receipt-total.component';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  defaultNumberOfLineItems = 3;
  numOfPeople = 2;
  waysToSplit = [
    WaysToSplit.Person1,
    WaysToSplit.Person2,
    WaysToSplit.All
  ]
  partiesToSplit = [
    WaysToSplit.Person1,
    WaysToSplit.Person2
  ]

  lineItems: ILineItem[] = [{ itemAmount: 0, splitBy: -1 }];
  receiptTotals: ReceiptTotals = {
    subtotal: 0,
    tax: 0,
    total: 0,
    tip: 0,
    final: 0,
  }

  constructor() { }

  calculateLineItems(lineItems: ILineItem[]) {
    this.lineItems = lineItems;
  }

  calculateTotals(totals: ReceiptTotals) {
    this.receiptTotals = totals;
  }
}