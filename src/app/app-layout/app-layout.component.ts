import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ILineItemUpdateEventPayload, LineItemComponent } from '../line-item/line-item.component';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  defaultNumberOfLineItems = 3;
  numberOfLineItems: number = 0;
  lineItems: number[] = [];
  lineItemsForm = this.fb.group({
    lineItemsArray: this.fb.array([])
  });

  constructor(private fb: FormBuilder) { }

  get formLineItems() {
    return this.lineItemsForm.controls["lineItemsArray"] as FormArray;
  }
  ngOnInit(): void {
    this.lineItems = Array(this.defaultNumberOfLineItems).fill(0);
  }

  addLineItem() {
    const lineItem = this.fb.group({
      itemAmount: 0
    });
    this.lineItemsForm.controls['lineItemsArray'].push(lineItem as any);
  }

  deleteLineItem(index: number) {
    console.log(`removing index ${index}`)
  }

  /** DEBUG TOOLS **/
  lineItemEventPayload: ILineItemUpdateEventPayload = { index: -1, amount: -1, splitBy: -1 };
  lineItemDebugDataSource: ILineItemUpdateEventPayload[] = [];

  lineItem1Data: ILineItemUpdateEventPayload = { index: 0, amount: -1, splitBy: -1 };
  lineItem2Data: ILineItemUpdateEventPayload = { index: 1, amount: -1, splitBy: -1 };
  lineItem3Data: ILineItemUpdateEventPayload = { index: 2, amount: -1, splitBy: -1 };


  lineItemEvent(payload: ILineItemUpdateEventPayload) {
    this.lineItemEventPayload = payload;
    this.lineItemDebugDataSource[payload.index] = payload;
  }
}
