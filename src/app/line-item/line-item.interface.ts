export interface ILineItem {
    itemAmount: number;
    splitBy: number;
}

import { FormArray, FormControl, FormGroup } from "@angular/forms";

// types + interfaces for the Angular reactive form
export type ILineItemFormGroup = FormGroup<ILineItemForm>;

export type ILineItemRowsArray = FormArray<FormGroup<ILineItemRow>>;

export type ILineItemRowGroup = FormGroup<ILineItemRow>;

export type ILineItemRowControls = ILineItemRow;

export interface ILineItemForm {
    lineItemsArray: FormArray<FormGroup<ILineItemRow>>
}

export interface ILineItemRow {
    itemAmount: FormControl<number | null>;
    splitBy: FormGroup<FormControl<number | null>[]>;
}

export type ISplitByRadiosGroup = FormGroup<FormControl<number | null>[]>;
export type ISplitByFormControl = FormControl<number | null>;