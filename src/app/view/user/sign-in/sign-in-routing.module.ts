import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInPage } from './sign-in.page';

const routes: Routes = [
  {
    path: '',
    component: SignInPage,
    children: [
      {
        path: '',
        redirectTo: 'new-bill',
        pathMatch: 'full',
      },

      {
        path: 'bill-amount',
        loadChildren: () =>
          import('./invoice-amount/invoice-amount.module').then(
            (m) => m.InvoiceAmountPageModule
          ),
      },
      {
        path: 'qr-code',
        loadChildren: () =>
          import('./invoice-qr/invoice-qr.module').then(
            (m) => m.InvoiceQrPageModule
          ),
      },
      {
        path: 'new-bill',
        loadChildren: () =>
          import('./new-invoice/new-invoice.module').then(
            (m) => m.NewInvoicePageModule
          ),
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyPageModule
          ),
      },
      {
        path: 'terms-condition',
        loadChildren: () =>
          import('./terms-condition/terms-condition.module').then(
            (m) => m.TermsConditionPageModule
          ),
      },
      {
        path: 'transaction-report',
        loadChildren: () =>
          import('./transaction-report/transaction-report.module').then(
            (m) => m.TransactionReportPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInPageRoutingModule {}
