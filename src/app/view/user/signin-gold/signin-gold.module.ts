import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninGoldPageRoutingModule } from './signin-gold-routing.module';

import { SigninGoldPage } from './signin-gold.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninGoldPageRoutingModule
  ],
  declarations: [SigninGoldPage]
})
export class SigninGoldPageModule {}
