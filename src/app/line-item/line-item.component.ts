import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Parties } from '../shared/Parties';
import { SplitBy } from '../shared/SplitByEnum';

@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent implements OnInit, OnChanges {
  @Input() itemNumber = '';
  amount = 0;
  parties = Parties;
  splitBy = '';

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
