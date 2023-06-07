import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ReceiptTotalComponent } from './receipt-total/receipt-total.component';
import { LineItemComponent } from './line-item/line-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    ReceiptTotalComponent,
    LineItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
