import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalstorageService } from 'src/app/shared/services/localStorageService/localstorage.service';
import { LoginService } from './service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  errMsg: string;
  Credential: any = {
    mobileno: 9876543225,
    password: '123456',
  };
  // loginWithOtp = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit() {
    console.log(this.route.parent);
  }

  handleLogin(login: NgForm) {
    /* // device fingerprint
    const emailValue = this.email.value?.trim();
    const passwordValue = this.password.value?.trim();
    if (emailValue?.length !== 0 && passwordValue?.length !== 0) {
      const data = {
        email: emailValue,
        password: passwordValue,
      };
      this.loginService.sendLoginCredential(data).subscribe((info: any) => {
        this.localStorageService.setItem('token', info['token']);
        console.log(info['token']);
      });
    } */
    const browserToken = this.localStorageService.getItem('browserToken');
    const data = {
      Mobile: Number(this.Credential.mobileno),
      password: this.Credential.password,
      browserToken,
      Application_Id:1,
    };

    console.log(data);
    this.loginService.sendLoginCredential(data).subscribe({
      next: (data: any) => {
        this.loginService.loginData = data;
        console.log("login Data : ",this.loginService.loginData);
        // this.router.navigate(['./signin'], { relativeTo: this.route.parent });
        this.router.navigateByUrl('views/user/signin');
        // this.localStorageService.setItem('AuthToken', data?.data?.AuthToken);
      },
      error: (err) => (this.errMsg = err.error.error),
    });
  }

}
