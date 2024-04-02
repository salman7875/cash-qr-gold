import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { App_Service_Config } from './appConfig/appConfig';
import { environment } from 'src/environments/environment';
import { ViewPageModule } from './view/view.module';
import { JwtInterceptor } from './appConfig/jwt.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ViewPageModule,
  ],
  providers: [
    {
      provide: App_Service_Config,
      useValue: environment.apiEndpoint,
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
