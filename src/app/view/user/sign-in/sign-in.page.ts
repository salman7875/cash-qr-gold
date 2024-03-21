import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/services/language/language.service';
import { Preferences } from '@capacitor/preferences';
import { LoginService } from '../login/service/login.service';
export interface menuList{
  MENU_OPTION: string,
  ROUTE:string,
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  logo: string;
  subLogo: string;
  footer: string = 'Technical solution provided by Alt-pi';
  merchantLogo: string;
  defaultMercantLogo: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  agentname: string;
  bussinessName: string;
  menuName: string;
  menuList:menuList[];
  currentLang : any;
  availableLangs:any;
  defaultlang:any;

  constructor(
    private loginService: LoginService,
    private langService: LanguageService
  ) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'lang' });
    this.defaultlang = value
    
    //setting the language on load
    this.langService.currentLang.subscribe(data => {
      console.log(this.loginService.loginData)
      console.log(data)
      this.currentLang = data;
      this.footer = data?.FOOTER_TEXT ;
      this.menuName = data?.MENU;
      this.menuList = data?.SIDEMENU;
    });
    this.availableLangs = this.loginService.loginData?.languages;
    this.merchantLogo =  this.loginService.loginData?.collectionAgent?.logo || '';
    if (this.merchantLogo !== '') {
      this.merchantLogo = 'data:image/png;base64,' + this.merchantLogo;
    }

    this.logo = this.loginService.loginData?.UI?.header?.logo || '';
    if (this.logo !== '') {
      this.logo = 'data:image/png;base64,' + this.logo;
    }

    this.subLogo = this.loginService.loginData?.UI?.header?.subLogo || '';
    if (this.subLogo !== '') {
      this.subLogo = 'data:image/png;base64,' + this.subLogo;
    }
    
    this.bussinessName = this.loginService.loginData?.userInfo?.Party_Name;

    this.agentname =
      this.loginService.loginData?.userInfo?.F_name +
      ' ' +
      this.loginService.loginData?.userInfo?.L_name;

    //footer from language service

   
  }

  languageSelection(e:any){
    this.langService.setLang(e.detail.value);
  }

}
