import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent implements OnInit {
  @Input() itemNumber = "0";

  constructor() { }

  ngOnInit(): void {
  }

}
