import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ReceiptTotalComponent } from './receipt-total/receipt-total.component';
import { LineItemComponent } from './line-item/line-item.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    ReceiptTotalComponent,
    LineItemComponent,
    CalculationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
