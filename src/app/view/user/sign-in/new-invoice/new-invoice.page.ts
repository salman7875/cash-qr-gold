import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/shared/services/localStorageService/localstorage.service';

import { LanguageService } from 'src/app/shared/services/language/language.service';
import { Share } from '@capacitor/share';
import { LoginService } from '../../login/service/login.service';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.page.html',
  styleUrls: ['./new-invoice.page.scss'],
})
export class NewInvoicePage implements OnInit {
  agentLogo: string;
  title: any;
  label: any = 'Merchant Details';
  enteredAmount: number;
  extraNote: string;

  currentLang: any;
  endUsers: any;
  searchPlaceHolder: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private langService: LanguageService
  ) {}

  ngOnInit() {
    console.log(this.loginService.loginData);
    this.langService.currentLang.subscribe((data) => {
      this.currentLang = data;
      this.title = data.DEPOSITORS;
      this.searchPlaceHolder = data?.SEARCHBAR_PLACEHOLDER;
    });
    // this.label = this.loginService.loginData?.collectionAgentDetails?.label;
    this.endUsers = this.loginService.loginData.endUsers;
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();

    this.endUsers = this.loginService.loginData.endUsers.filter(
      (d: any) => d.name.toLowerCase().indexOf(query) > -1
    );
  }

  handleUserRoute(value: any) {
    this.router.navigate(['../bill-amount'], {
      relativeTo: this.route.parent,
      state: { userData: value },
    });
  }

  handdleExit() {
    // let browerToken = localStorage.getItem('browerToken');
    // localStorage.clear();
    // restore the item you want to keep
    // if (browerToken) {
    //   localStorage.setItem('browerToken', browerToken);
    // }
    this.router.navigate(['../login'], { relativeTo: this.route.parent });
  }

  async Share() {
    const textToShare = `asfjkasfkasfd$ \n asddsada `;

    await Share.share({
      title: 'Share via',
      text: textToShare,
      dialogTitle: 'Share',
    });
  }
}
