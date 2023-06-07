import { Component, OnInit } from '@angular/core';
import { LineItemComponent } from '../line-item/line-item.component';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  lineItems: LineItemComponent[] = []

  constructor() { }

  ngOnInit(): void {
    this.lineItems = [
      new LineItemComponent(),
      new LineItemComponent(),
      new LineItemComponent()
    ];
  }

}
