import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceAmountPageRoutingModule } from './invoice-amount-routing.module';

import { InvoiceAmountPage } from './invoice-amount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceAmountPageRoutingModule
  ],
  declarations: [InvoiceAmountPage]
})
export class InvoiceAmountPageModule {}
