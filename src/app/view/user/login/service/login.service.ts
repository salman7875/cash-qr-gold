import {Inject, Injectable } from '@angular/core';
import { App_Service_Config } from 'src/app/appConfig/appConfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // loginData: any = {};
  loginData: any = {};
  constructor(
    @Inject(App_Service_Config) public config: string,
    private http: HttpClient
  ) {}
  sendLoginCredential(data: any) {
    return this.http.post(`${this.config}/crdsoc/login`, data); 
  }
}
