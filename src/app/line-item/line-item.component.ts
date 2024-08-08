import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { v4 as uuidv4 } from "uuid";
import { WaysToSplit } from '../shared/WaysToSplitEnum';
import { ILineItem, ILineItemChangeEvent, ILineItemForm, ILineItemFormControl, ILineItemRowGroup, ILineItemRowsArray } from './line-item.interface';

@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent implements OnInit, OnDestroy {
  @Input() startNumOfLines = 0;
  @Input() waysToSplit: WaysToSplit[] = [];
  @Output() lineItemUpdateEvent = new EventEmitter<ILineItem[]>();

  WaysToSplitEnum = WaysToSplit;

  subscriptions: Array<[string, Subscription]> = []

  formGroup = this.formBuilder.group<ILineItemForm>({
    lineItemsArray: this.formBuilder.array<ILineItemRowGroup>([])
  });

  constructor(private formBuilder: FormBuilder) { }

  // #region Form Elements Getters
  get lineItemsArray(): ILineItemRowsArray {
    return this.formGroup.controls['lineItemsArray'];
  }

  getLineItemFormGroup(index: number): ILineItemRowGroup {
    return this.lineItemsArray.at(index)
  }

  getLineItemSplitByFormControl(index: number): FormControl<number | null> {
    const lineItem = this.getLineItemFormGroup(index);
    const splitByFormControl = this.getSplitByFormControl(lineItem);
    return splitByFormControl;
  }
  // #endregion

  // #region Lifecycle Hooks
  ngOnInit(): void {
    let loopNumber = 0;
    const underSafetyLimitBreak = loopNumber < 50;

    while (this.lineItemsArray.length < this.startNumOfLines && underSafetyLimitBreak) {
      loopNumber++;
      this.addLineItem();
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((item) => {
        const sub = item[1];
        sub.unsubscribe();
      })
    }
  }
  // #endregion

  // #region Template Helper Functions
  addLineItem(): void {
    const newLineItem: ILineItemRowGroup = this.createNewLineItem();
    const newLineChanges$: Observable<Partial<ILineItemChangeEvent>> = newLineItem.valueChanges;
    const newLineItemChangesSub: Subscription = newLineChanges$.subscribe(() => {
      this.emitLineItems();
    })

    const newLineItemSplitByKey = this.getSplitByKey(newLineItem);

    this.subscriptions.push([newLineItemSplitByKey, newLineItemChangesSub]);
    this.lineItemsArray.push(newLineItem);
  }

  deleteLineItem(index: number): void {
    const lineItem: ILineItemRowGroup = this.getLineItemFormGroup(index);
    const lineItemSplitByKey = this.getSplitByKey(lineItem);
    const lineSubIndex = this.subscriptions.findIndex((sub) => sub[0] === lineItemSplitByKey);
    const lineSub = this.subscriptions[lineSubIndex];

    lineSub[1].unsubscribe();
    this.subscriptions.splice(lineSubIndex, 1)
    this.lineItemsArray.removeAt(index);
    this.emitLineItems();
  }
  // #endregion

  // #region Component Helper Functions
  private createNewLineItem(): ILineItemRowGroup {
    const guid = uuidv4();
    const splitByKey = `splitBy-${guid}`

    const rowFormControl = this.formBuilder.group<ILineItemFormControl>({
      itemAmount: this.formBuilder.control<number | null>(null, { validators: [Validators.required, Validators.pattern("^[0-9]*$")], updateOn: 'blur' }),
      [splitByKey]: this.formBuilder.control<number | null>(null, { validators: [Validators.required], updateOn: 'change' })
    });

    return rowFormControl;
  }

  private emitLineItems(): void {
    let emitPayload: ILineItem[] = [];

    this.lineItemsArray.controls.forEach((row: FormGroup<ILineItemFormControl>) => {
      if (row.valid) {
        const splitByKey = this.getSplitByKey(row);
        emitPayload.push({
          itemAmount: row.controls.itemAmount.value!,
          splitBy: row.controls[splitByKey].value!
        })
      }
    })

    this.lineItemUpdateEvent.emit(emitPayload);
  }

  private getSplitByKey(row: FormGroup<ILineItemFormControl>): string {
    const keys = Object.keys(row.controls);
    const filteredKeys = keys.filter((key) => key !== 'itemAmount');
    let splitByKey = '';

    if (filteredKeys.length > 0) {
      splitByKey = filteredKeys[0]
    }

    return splitByKey;
  }

  private getSplitByFormControl(row: FormGroup<ILineItemFormControl>): FormControl<number | null> {
    const splitByKey = this.getSplitByKey(row);
    const splitByFormControl = row.controls[splitByKey];
    return splitByFormControl;
  }
  // #endregion
}

