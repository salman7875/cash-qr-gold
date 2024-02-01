import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { HttpClientModule } from '@angular/common/http';
import { SignInPageModule } from './sign-in/sign-in.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserPageRoutingModule,
    SignInPageModule
  ],
  declarations: [UserPage,LoginComponent]
})
export class UserPageModule {}
