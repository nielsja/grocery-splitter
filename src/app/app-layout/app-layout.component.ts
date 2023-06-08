import { Component, OnInit } from '@angular/core';
import { ILineItemUpdateEventPayload, LineItemComponent } from '../line-item/line-item.component';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  lineItems = [1, 2, 3]
  lineItemEventPayload: ILineItemUpdateEventPayload = { itemNumber: -1, itemAmount: -1, splitBy: -1 };
  lineItem1Data: ILineItemUpdateEventPayload = { itemNumber: 1, itemAmount: -1, splitBy: -1 };
  lineItem2Data: ILineItemUpdateEventPayload = { itemNumber: 2, itemAmount: -1, splitBy: -1 };
  lineItem3Data: ILineItemUpdateEventPayload = { itemNumber: 3, itemAmount: -1, splitBy: -1 };

  constructor() { }

  ngOnInit(): void {

  }

  lineItemEvent(payload: ILineItemUpdateEventPayload) {
    this.lineItemEventPayload = payload;
    switch (payload.itemNumber) {
      case 1:
        this.lineItem1Data = payload;
        break;
      case 2:
        this.lineItem2Data = payload;
        break;
      case 3:
        this.lineItem3Data = payload;
        break;

    }
  }
}
