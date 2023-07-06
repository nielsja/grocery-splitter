import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormControlOptions, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

type FormFields = 'subtotal' | 'tax' | 'total' | 'tip' | 'final';
type ReceiptForm = {
  [k in FormFields]: FormControl<number | null>
}

export interface ReceiptTotals {
  subtotal: number;
  tax: number;
  total: number;
  tip: number;
  final: number;
}
@Component({
  selector: 'receipt-total',
  templateUrl: './receipt-total.component.html',
  styleUrls: ['./receipt-total.component.scss']
})
export class ReceiptTotalComponent implements OnInit, OnDestroy {
  @Output() amountAdded = new EventEmitter<ReceiptTotals>();

  regex = new RegExp(/[^\.\d]/g);

  receiptForm = this.fb.group<ReceiptForm>({
    subtotal: this.fb.control<number | null>(null, { validators: [Validators.required, Validators.pattern("^[0-9]*$")], updateOn: 'change' }),
    tax: this.fb.control<number | null>(null, { validators: [Validators.required, Validators.pattern("^[0-9]*$")], updateOn: 'change' }),
    total: this.fb.control<number | null>({ value: null, disabled: true }, { validators: [Validators.required, Validators.pattern("^[0-9]*$")], updateOn: 'change' }),
    tip: this.fb.control<number | null>(null, { validators: [Validators.required, Validators.pattern("^[0-9]*$")], updateOn: 'change' }),
    final: this.fb.control<number | null>({ value: null, disabled: true }, { validators: [Validators.required, Validators.pattern("^[0-9]*$")], updateOn: 'change' }),
  });

  get subtotal(): FormControl<number | null> {
    return this.receiptForm.controls.subtotal
  }
  get tax(): FormControl<number | null> {
    return this.receiptForm.controls.tax
  }
  get total(): FormControl<number | null> {
    return this.receiptForm.controls.total
  }
  get tip(): FormControl<number | null> {
    return this.receiptForm.controls.tip
  }
  get final(): FormControl<number | null> {
    return this.receiptForm.controls.final
  }

  subtotal$: Observable<number | null>;
  subtotalSub: Subscription;

  tax$: Observable<number | null>;
  taxSub: Subscription;

  tip$: Observable<number | null>;
  tipSub: Subscription;

  constructor(private fb: FormBuilder) {
    this.subtotal$ = this.receiptForm.controls.subtotal.valueChanges;
    this.subtotalSub = this.subtotal$.subscribe(() => {
      this.updateTotals();
    });

    this.tax$ = this.receiptForm.controls.tax.valueChanges;
    this.taxSub = this.tax$.subscribe(() => {
      this.updateTotals();
    });

    this.tip$ = this.receiptForm.controls.tip.valueChanges;
    this.tipSub = this.tip$.subscribe(() => {
      this.updateTotals();
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subtotalSub.unsubscribe();
    this.taxSub.unsubscribe();
    this.tipSub.unsubscribe();
  }

  removeNonDigits(name: FormFields): void {
    const field = this.receiptForm.controls[name];
    const originalValue = field.value ?? '';
    const hasInvalidChar = this.regex.test(originalValue.toString());

    if (hasInvalidChar) {
      const updatedValue = this.getAmount(originalValue);
      field.patchValue(updatedValue);
    }
  }

  private updateTotals(): void {
    const subtotal: number = this.getAmount(this.subtotal.value);
    const tax: number = this.getAmount(this.tax.value);
    const total: number = this.roundedSum([subtotal, tax]);
    const tip: number = this.getAmount(this.tip.value);
    const final: number = this.roundedSum([subtotal, tax, tip]);
    console.log(`subtotal: ${subtotal}\n tax: ${tax}\n total: ${total}\n tip: ${tip}\n final: ${final}\n `)
    this.total.setValue(total);
    this.final.setValue(final);
    this.emitTotals();
  }

  private roundedSum(amounts: number[]): number {
    let total = 0;

    amounts.forEach((amt) => {
      total += +amt
    });

    const multipliedBy100 = total * 100;
    const rounded = Math.round(multipliedBy100);
    const dividedBy100 = rounded / 100;
    return dividedBy100;
  }

  private getAmount(inputValue: number | string | null): number {
    let amount = 0;
    if (inputValue) {
      amount = Number(inputValue.toString().replace(this.regex, ''))
    }
    return amount;
  }

  private emitTotals(): void {
    let emitPayload: ReceiptTotals = {
      subtotal: this.getAmount(this.subtotal.value),
      tax: this.getAmount(this.tax.value),
      total: this.getAmount(this.total.value),
      tip: this.getAmount(this.tip.value),
      final: this.getAmount(this.final.value),
    }
    this.amountAdded.emit(emitPayload)
  }
}
