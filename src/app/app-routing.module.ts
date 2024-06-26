import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  //   children: [
  {
    path: '',
    redirectTo: 'views',
    pathMatch: 'full',
  },
  {
    path: 'views',
    loadChildren: () =>
      import('./view/view.module').then((m) => m.ViewPageModule),
  },

  //   ],
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
