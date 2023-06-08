import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface ILineItemUpdateEventPayload {
  index: number;
  amount: number;
  splitBy: number;
}
@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent {
  @Input() itemNumber = -1;
  @Output() lineItemUpdateEvent = new EventEmitter<ILineItemUpdateEventPayload>();

  formGroup = new FormGroup({
    splitByRadio: new FormControl(),
    itemAmount: new FormControl()
  })


  updateLineItem() {
    this.lineItemUpdateEvent.emit({
      index: Number(this.itemNumber),
      amount: this.formGroup.controls['itemAmount'].value,
      splitBy: this.formGroup.controls['splitByRadio'].value
    });
  }

  constructor() { }

}
