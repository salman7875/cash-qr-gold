import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceQrPage } from './invoice-qr.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceQrPageRoutingModule {}
