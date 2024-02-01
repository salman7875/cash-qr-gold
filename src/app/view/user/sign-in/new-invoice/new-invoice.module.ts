import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewInvoicePageRoutingModule } from './new-invoice-routing.module';

import { NewInvoicePage } from './new-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewInvoicePageRoutingModule
  ],
  declarations: [NewInvoicePage]
})
export class NewInvoicePageModule {}
