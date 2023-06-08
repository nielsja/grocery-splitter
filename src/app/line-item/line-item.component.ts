import { Component, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface ILineItemUpdateEventPayload {
  itemNumber: number;
  itemAmount: number;
  splitBy: number;
}
@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent implements OnInit, OnChanges {
  @Input() itemNumber = '';
  @Output() lineItemUpdateEvent = new EventEmitter<ILineItemUpdateEventPayload>();
  @Output() splitByEvent = new EventEmitter<number>();
  @Output() itemAmount = new EventEmitter<number>();

  formGroup = new FormGroup({
    splitByRadio: new FormControl(),
    itemAmount: new FormControl()
  })

  updateLineItem() {
    this.lineItemUpdateEvent.emit({
      itemNumber: Number(this.itemNumber),
      itemAmount: this.formGroup.controls['itemAmount'].value,
      splitBy: this.formGroup.controls['splitByRadio'].value
    });
  }

  splitByClicked(splitBy: number): void {
    this.splitByEvent.emit(splitBy);
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

}
