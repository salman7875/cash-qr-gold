import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signin',
        loadChildren: () =>
          import('./sign-in/sign-in.module').then((m) => m.SignInPageModule),
      },
      {
        path: 'signin-gold',
        loadChildren: () => import('./signin-gold/signin-gold.module').then(m => m.SigninGoldPageModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule { }
