import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LineItemComponent } from '../line-item/line-item.component';
import { ILineItem } from '../line-item/line-item.interface';
import { WaysToSplit, SplitBetween } from '../shared/WaysToSplitEnum';
import { Observable } from 'rxjs';
import { ReceiptTotals } from '../receipt-total/receipt-total.component';

interface ICalculatedAmounts {
  solo: number;
  split: number;
  subtotal: number;
  tax: number;
  tip: number;
  totalWithTax: number;
  totalWithTaxAndTip: number;
}

type CalculatedAmounts = {
  [key in SplitBetween]?: ICalculatedAmounts;
}

interface ICalculation {
  Person1: ICalculatedAmounts;
  Person2: ICalculatedAmounts;
}

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  defaultNumberOfLineItems = 3;
  numOfPeople = 2;
  waysToSplit = [
    WaysToSplit.Person1,
    WaysToSplit.Person2,
    WaysToSplit.All
  ]

  lineItems: ILineItem[] = [{ itemAmount: 0, splitBy: -1 }];
  receipt: ReceiptTotals = {
    subtotal: 0,
    tax: 0,
    total: 0,
    tip: 0,
    final: 0,
  }
  calcs: ICalculation = {
    Person1: {
      solo: 0,
      split: 0,
      subtotal: 0,
      tax: 0,
      tip: 0,
      totalWithTax: 0,
      totalWithTaxAndTip: 0,
    },
    Person2: {
      solo: 0,
      split: 0,
      subtotal: 0,
      tax: 0,
      tip: 0,
      totalWithTax: 0,
      totalWithTaxAndTip: 0,
    }
  }

  constructor() { }

  ngOnInit(): void { }

  calculateLineItems(lineItems: ILineItem[]) {
    this.lineItems = lineItems;
    this.calculateAmounts(this.lineItems, this.receipt);
  }

  calculateTotals(totals: ReceiptTotals) {
    this.receipt = totals;
    this.calculateAmounts(this.lineItems, this.receipt);
  }

  private calculateAmounts(lineItems: ILineItem[], receipt: ReceiptTotals) {
    this.resetCalculatedAmounts();

    // divide up each item
    lineItems.forEach((item) => {
      // don't know why these are equivalent, but need to do this bullshit casting to make it work
      // WaysToSplit[item.splitBy] as unknown as number === WaysToSplit.Person1
      // item.splitBy.toString() === WaysToSplit[1]
      const splitBy = WaysToSplit[item.splitBy] as unknown as number;

      switch (splitBy) {
        case WaysToSplit.Person1:
          this.calcs.Person1.solo += +item.itemAmount;
          break;
        case WaysToSplit.Person2:
          this.calcs.Person2.solo += +item.itemAmount;
          break;
        case WaysToSplit.All:
          this.calcs.Person1.split += +this.splitBetweenAll(item.itemAmount, this.numOfPeople, true);
          this.calcs.Person2.split += +this.splitBetweenAll(item.itemAmount, this.numOfPeople, false);
          break;
      }
    })

    // calculate subtotals (no tax + no tip)
    this.calcs.Person1.subtotal = this.sum([this.calcs.Person1.solo, this.calcs.Person1.split]);
    this.calcs.Person2.subtotal = this.sum([this.calcs.Person2.solo, this.calcs.Person2.split]);

    // calculate tax amounts
    this.calcs.Person1.tax = this.calcTax(this.calcs.Person1.subtotal, receipt.subtotal, receipt.tax, true)
    this.calcs.Person2.tax = this.calcTax(this.calcs.Person2.subtotal, receipt.subtotal, receipt.tax, true)

    // calculate tip amounts
    this.calcs.Person1.tip = this.splitBetweenAll(receipt.tip, this.numOfPeople, true);
    this.calcs.Person2.tip = this.splitBetweenAll(receipt.tip, this.numOfPeople, false);

    // aggregate amounts
    this.calcs.Person1.totalWithTax = this.sum([this.calcs.Person1.subtotal, this.calcs.Person1.tax]);
    this.calcs.Person2.totalWithTax = this.sum([this.calcs.Person2.subtotal, this.calcs.Person2.tax]);
    this.calcs.Person1.totalWithTaxAndTip = this.sum([this.calcs.Person1.subtotal, this.calcs.Person1.tax, this.calcs.Person1.tip]);
    this.calcs.Person2.totalWithTaxAndTip = this.sum([this.calcs.Person2.subtotal, this.calcs.Person2.tax, this.calcs.Person2.tip]);
  }

  private calcTax(personSubtotal: number, receiptSubtotal: number, tax: number, roundUp: boolean = true): number {
    if (personSubtotal <= 0 || receiptSubtotal <= 0 || tax <= 0) {
      return 0;
    }

    const percentage = personSubtotal / receiptSubtotal;
    const portionOfTax = percentage * tax;
    const multiplyBy100 = portionOfTax * 100;
    const rounded = roundUp ? Math.ceil(multiplyBy100) : Math.floor(multiplyBy100);
    const dividedBy100 = rounded / 100;
    return dividedBy100
  }

  private splitBetweenAll(amount: number, numOfParties: number, roundUp: boolean = true) {
    if (amount <= 0) {
      return 0;
    }

    const divideByAll = amount / numOfParties; //2.505
    const multiplyBy100 = divideByAll * 100; // 250.5
    const rounded = roundUp ? Math.ceil(multiplyBy100) : Math.floor(multiplyBy100); // 251
    const dividedBy100 = rounded / 100; // 2.51
    return dividedBy100;
  }

  private sum(amounts: number[]): number {
    let total = 0;

    amounts.forEach((amt) => {
      total += +amt
    });

    const multipliedBy100 = total * 100;
    const rounded = Math.round(multipliedBy100);
    const dividedBy100 = rounded / 100;
    return dividedBy100;
  }

  private resetCalculatedAmounts(): void {
    const defaultValue: ICalculatedAmounts = {
      solo: 0,
      split: 0,
      subtotal: 0,
      tax: 0,
      tip: 0,
      totalWithTax: 0,
      totalWithTaxAndTip: 0,
    };

    this.calcs.Person1 = { ...defaultValue };
    this.calcs.Person2 = { ...defaultValue };
  }
}