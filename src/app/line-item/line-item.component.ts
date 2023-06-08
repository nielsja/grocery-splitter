import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent implements OnInit, OnChanges {
  @Input() itemNumber = '';

  formGroup = new FormGroup({
    splitByRadio: new FormControl(),
    itemAmount: new FormControl()
  })


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

}
