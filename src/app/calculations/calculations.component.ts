import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ILineItem } from '../line-item/line-item.interface';
import { ReceiptTotals } from '../receipt-total/receipt-total.component';
import { SplitParties, WaysToSplit } from '../shared/WaysToSplitEnum';

interface ICalculatedAmounts {
  solo: number;
  split: number;
  subtotal: number;
  tax: number;
  tip: number;
  totalWithTax: number;
  totalWithTaxAndTip: number;
}

type CalculatedAmountsType = keyof ICalculatedAmounts;

type CalculatedAmounts = {
  [key in SplitParties]?: ICalculatedAmounts;
}

export type ICalculation = Record<SplitParties, ICalculatedAmounts>;


@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnChanges {
  @Input() lineItems: ILineItem[] = [];
  @Input() receipt!: ReceiptTotals;
  @Input() waysToSplit: WaysToSplit[] = [];
  @Input() partiesToSplit: WaysToSplit[] = [];
  @Input() numOfPeople: number = 1;
  DEFAULT_CALCULATION: ICalculatedAmounts = {
    solo: 0,
    split: 0,
    subtotal: 0,
    tax: 0,
    tip: 0,
    totalWithTax: 0,
    totalWithTaxAndTip: 0,
  };


  calculations: ICalculation;

  constructor() {
    this.calculations = {
      Person1: { ...this.DEFAULT_CALCULATION },
      Person2: { ...this.DEFAULT_CALCULATION }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateAmounts();
  }

  private calculateAmounts() {
    this.resetCalculatedAmounts();

    // divide up each item
    this.lineItems.forEach((item) => {
      // don't know why these are equivalent, but need to do this bullshit casting to make it work
      // WaysToSplit[item.splitBy] as unknown as number === WaysToSplit.Person1
      // item.splitBy.toString() === WaysToSplit[1]
      const splitBy = WaysToSplit[item.splitBy] as unknown as number;

      switch (splitBy) {
        case WaysToSplit.Person1:
          this.calculations.Person1.solo += +item.itemAmount;
          break;
        case WaysToSplit.Person2:
          this.calculations.Person2.solo += +item.itemAmount;
          break;
        case WaysToSplit.All:
          this.calculations.Person1.split += +this.splitBetweenAll(item.itemAmount, this.numOfPeople, true);
          this.calculations.Person2.split += +this.splitBetweenAll(item.itemAmount, this.numOfPeople, false);
          break;
      }
    })

    // // calculate subtotals (no tax + no tip)
    this.calculations.Person1.subtotal = this.sum([this.calculations.Person1.solo, this.calculations.Person1.split]);
    this.calculations.Person2.subtotal = this.sum([this.calculations.Person2.solo, this.calculations.Person2.split]);

    // // calculate tax amounts
    this.calculations.Person1.tax = this.calcTax(this.calculations.Person1.subtotal, this.receipt.subtotal, this.receipt.tax, true)
    this.calculations.Person2.tax = this.calcTax(this.calculations.Person2.subtotal, this.receipt.subtotal, this.receipt.tax, true)

    // // calculate tip amounts
    this.calculations.Person1.tip = this.splitBetweenAll(this.receipt.tip, this.numOfPeople, true);
    this.calculations.Person2.tip = this.splitBetweenAll(this.receipt.tip, this.numOfPeople, false);

    // // aggregate amounts
    this.calculations.Person1.totalWithTax = this.sum([this.calculations.Person1.subtotal, this.calculations.Person1.tax]);
    this.calculations.Person2.totalWithTax = this.sum([this.calculations.Person2.subtotal, this.calculations.Person2.tax]);
    this.calculations.Person1.totalWithTaxAndTip = this.sum([this.calculations.Person1.subtotal, this.calculations.Person1.tax, this.calculations.Person1.tip]);
    this.calculations.Person2.totalWithTaxAndTip = this.sum([this.calculations.Person2.subtotal, this.calculations.Person2.tax, this.calculations.Person2.tip]);
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
    this.calculations.Person1 = { ...this.DEFAULT_CALCULATION };
    this.calculations.Person2 = { ...this.DEFAULT_CALCULATION };
  }

}
