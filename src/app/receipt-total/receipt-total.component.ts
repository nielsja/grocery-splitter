import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'receipt-total',
  templateUrl: './receipt-total.component.html',
  styleUrls: ['./receipt-total.component.scss']
})
export class ReceiptTotalComponent implements OnInit {
  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }

}
