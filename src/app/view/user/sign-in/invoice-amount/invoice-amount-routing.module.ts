import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceAmountPage } from './invoice-amount.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceAmountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceAmountPageRoutingModule {}
