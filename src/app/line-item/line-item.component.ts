import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WaysToSplit } from '../shared/WaysToSplitEnum';
import { ILineItem, ILineItemForm, ILineItemRow, ILineItemRowControls, ILineItemRowGroup, ILineItemRowsArray, ISplitByFormControl, ISplitByRadiosGroup } from './line-item.interface';


@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent implements OnInit {
  @Input() startNumOfLines = 0;
  @Output() lineItemUpdateEvent = new EventEmitter<ILineItem[]>();

  WaysToSplitEnum = WaysToSplit;
  waysToSplit = [
    WaysToSplit.Person1,
    WaysToSplit.Person2,
    WaysToSplit.All
  ]

  formGroup = this.formBuilder.group<ILineItemForm>({
    lineItemsArray: this.formBuilder.array<ILineItemRowGroup>([])
  });

  get lineItemsArray(): ILineItemRowsArray {
    return this.formGroup.controls['lineItemsArray'];
  }

  constructor(private formBuilder: FormBuilder) {
  }

  // #region Lifecycle Hooks
  ngOnInit(): void {
    let loopNumber = 0;
    const underSafetyLimitBreak = loopNumber < 50;

    while (this.lineItemsArray.length < this.startNumOfLines && underSafetyLimitBreak) {
      loopNumber++;
      this.addLineItem();
    }
  }
  // #endregion

  // #region Template Helper Functions
  addLineItem(): void {
    const newLineItem = this.createNewLineItem();
    this.lineItemsArray.push(newLineItem);
  }

  deleteLineItem(index: number): void {
    this.lineItemsArray.removeAt(index);
    this.emitLineItems();
  }

  updateLineItems(index: number) {
    const updatedLineItem = this.lineItemsArray.controls[index];
    if (updatedLineItem.valid) {
      this.emitLineItems();
    }
  }
  // #endregion

  // #region Component Helper Functions
  private createNewLineItem(): ILineItemRowGroup {
    return this.formBuilder.group<ILineItemRowControls>({
      itemAmount: this.formBuilder.control(null, { validators: [Validators.required, Validators.pattern("^[0-9]*$"),] }),
      splitBy: this.formBuilder.group<ISplitByFormControl[]>(this.createSplitByOptions(), { validators: [Validators.required] }),
    });
  }

  private createSplitByOptions(): ISplitByFormControl[] {
    let formControls: ISplitByFormControl[] = [];

    this.waysToSplit.forEach((way) => {
      formControls.push(this.formBuilder.control(way))
    })

    return formControls;
  }

  private emitLineItems() {
    let returnItems: ILineItem[] = [];

    this.lineItemsArray.controls.forEach((row) => {
      if (row.valid) {
        returnItems.push({
          itemAmount: row.controls['itemAmount'].value!,
          splitBy: 0
        })
      }
    })

    if (returnItems.length > 0) {
      this.lineItemUpdateEvent.emit(returnItems);
    }
  }
  // #endregion
}

