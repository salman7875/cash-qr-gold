import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceQrPageRoutingModule } from './invoice-qr-routing.module';

import { InvoiceQrPage } from './invoice-qr.page';
import { QRCodeModule } from 'angularx-qrcode';
import { QrcodeComponent } from './qrcode/qrcode.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    InvoiceQrPageRoutingModule,

  ],
  declarations: [InvoiceQrPage,QrcodeComponent]
})
export class InvoiceQrPageModule {}
