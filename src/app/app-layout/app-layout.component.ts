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
export class AppLayoutComponent implements OnInit {
  defaultNumberOfLineItems = 3;
  waysToSplit = [
    WaysToSplit.Person1,
    WaysToSplit.Person2,
    WaysToSplit.All
  ]
  numOfPeople = 2;

  person1Only = 0;
  person1Split = 0;
  person1Subtotal = 0;
  person1Tax = 0;
  person1Tip = 0;
  person1TotalWithTax = 0;
  person1TotalWithTaxAndTip = 0;

  person2Only = 0;
  person2Split = 0;
  person2Subtotal = 0;
  person2Tax = 0;
  person2Tip = 0;
  person2TotalWithTax = 0;
  person2TotalWithTaxAndTip = 0;

  lineItems: ILineItem[] = [{ itemAmount: 0, splitBy: WaysToSplit.All }];
  receipt: ReceiptTotals = {
    subtotal: 0,
    tax: 0,
    total: 0,
    tip: 0,
    final: 0,
  }
  constructor() { }

  ngOnInit(): void {
  }
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
      switch (item.splitBy) {
        case WaysToSplit.Person1:
          this.person1Only += item.itemAmount;
          break;
        case WaysToSplit.Person2:
          this.person2Only += item.itemAmount;
          break;
        case WaysToSplit.All:
          this.person1Split += this.splitBetweenAll(item.itemAmount, this.numOfPeople, true);
          this.person2Split += this.splitBetweenAll(item.itemAmount, this.numOfPeople, false);
          break;
      }
    })

    // calculate subtotals (no tax + no tip)
    this.person1Only += this.person1Only + this.person1Split;
    this.person2Subtotal += this.person2Only + this.person2Split;

    // calculate tax amounts
    this.person1Tax += this.calcTax(this.person1Subtotal, receipt.subtotal, receipt.tax, true)
    this.person2Tax += this.calcTax(this.person2Subtotal, receipt.subtotal, receipt.tax, true)

    // calculate tip amounts
    this.person1Tip += this.splitBetweenAll(receipt.tip, this.numOfPeople, true);
    this.person2Tip += this.splitBetweenAll(receipt.tip, this.numOfPeople, false);

    // aggregate amounts
    this.person1TotalWithTax += this.person1Subtotal + this.person1Tax;
    this.person2TotalWithTax += this.person2Subtotal + this.person2Tax;
    this.person1TotalWithTaxAndTip += this.person1Subtotal + this.person1Tax + this.person1Tip;
    this.person2TotalWithTaxAndTip += this.person2Subtotal + this.person2Tax + this.person2Tip;
  }

  private calcTax(personSubtotal: number, receiptSubtotal: number, tax: number, roundUp: boolean = true): number {
    const percentage = personSubtotal / receiptSubtotal;
    const portionOfTax = percentage * tax;
    const multiplyBy100 = portionOfTax * 100;
    const rounded = roundUp ? Math.ceil(multiplyBy100) : Math.floor(multiplyBy100);
    const dividedBy100 = rounded / 100;
    return dividedBy100
  }

  private splitBetweenAll(amount: number, numOfParties: number, roundUp: boolean = true) {
    const divideByAll = amount / numOfParties; //2.505
    const multiplyBy100 = divideByAll * 100; // 250.5
    const rounded = roundUp ? Math.ceil(multiplyBy100) : Math.floor(multiplyBy100); // 251
    const dividedBy100 = rounded / 100; // 2.51
    return dividedBy100;
  }

  resetCalculatedAmounts(): void {
    this.person1Only = 0;
    this.person1Split = 0;
    this.person1Subtotal = 0;
    this.person1Tax = 0;
    this.person1Tip = 0;
    this.person1TotalWithTax = 0;
    this.person1TotalWithTaxAndTip = 0;
    this.person2Only = 0;
    this.person2Split = 0;
    this.person2Subtotal = 0;
    this.person2Tax = 0;
    this.person2Tip = 0;
    this.person2TotalWithTax = 0;
    this.person2TotalWithTaxAndTip = 0;
  }
}