import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninGoldPage } from './signin-gold.page';

const routes: Routes = [
  {
    path: '',
    component: SigninGoldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninGoldPageRoutingModule {}
