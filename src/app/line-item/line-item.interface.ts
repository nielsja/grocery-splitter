import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { WaysToSplit } from "../shared/WaysToSplitEnum";

export interface ILineItem {
    itemAmount: number;
    splitBy: number;
}

export interface ILineItemChangeEvent {
    itemAmount: number | null;
    [key: string]: number | null;
}

export interface ILineItemForm {
    lineItemsArray: FormArray<FormGroup<ILineItemFormControl>>;
}

export interface ILineItemFormControl {
    itemAmount: FormControl<number | null>;
    [key: string]: FormControl<number | null>;
}

export type ILineItemFormGroup = FormGroup<ILineItemForm>;
export type ILineItemRowsArray = FormArray<FormGroup<ILineItemFormControl>>;
export type ILineItemRowGroup = FormGroup<ILineItemFormControl>;
