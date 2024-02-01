import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionReportPageRoutingModule } from './transaction-report-routing.module';

import { TransactionReportPage } from './transaction-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionReportPageRoutingModule
  ],
  declarations: [TransactionReportPage]
})
export class TransactionReportPageModule {}
