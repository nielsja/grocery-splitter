import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LineItemComponent } from '../line-item/line-item.component';
import { ILineItem } from '../line-item/line-item.interface';
import { WaysToSplit } from '../shared/WaysToSplitEnum';



@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  defaultNumberOfLineItems = 1;
  waysToSplit = [
    WaysToSplit.Person1,
    WaysToSplit.Person2,
    WaysToSplit.All
  ]

  constructor() { }

  ngOnInit(): void {
  }

  calculateTotals(lineItems: ILineItem[]) {
    lineItems.forEach((item) => {
      console.log(item.itemAmount, item.splitBy)
    })
    console.log('got to calculateTotals!',);
  }
}

const numericOnly: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let isValid = true;
  const validationError: ValidationErrors = { invalid: true }

  // do logic here to check if isValid should be flagged as 'false'
  return isValid ? null : validationError;
}