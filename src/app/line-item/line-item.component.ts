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
  })

  radioGroup = new FormGroup({

    person1RadioButton: new FormControl(SplitBy.Person1),
    person2RadioButton: new FormControl(SplitBy.Person2),
  })
  radioGroupsplitBy = new FormGroup({
    splitByRadioButton: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log('this.radioGroup.value:', this.radioGroup.value)
    console.log('this.radioGroupsplitBy.value:', this.radioGroupsplitBy.value)
  }

}
