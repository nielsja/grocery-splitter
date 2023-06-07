import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'receipt-totals',
  templateUrl: './receipt-totals.component.html',
  styleUrls: ['./receipt-totals.component.scss']
})
export class ReceiptTotalsComponent implements OnInit {
  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }

}
