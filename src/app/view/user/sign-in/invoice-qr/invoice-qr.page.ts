import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/shared/services/localStorageService/localstorage.service';

import { App_Service_Config } from 'src/app/appConfig/appConfig';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from 'src/app/shared/services/language/language.service';
import { LoginService } from '../../login/service/login.service';

@Component({
  selector: 'app-invoice-qr',
  templateUrl: './invoice-qr.page.html',
  styleUrls: ['./invoice-qr.page.scss'],
})
export class InvoiceQrPage implements OnInit {
  partyName: any;
  depositerVpa: any;
  depositerName: any;
  logoimg: string;
  accountNo: any;
  // logotext: string = 'Alt-Pi is collecting on behalf of';
  logotext: string;
  title: any;
  paymentType: any;
  qrString: string;
  final_amount: number = 0;
  encodestring: string;
  refNo: any;
  endUserData

  //languages
  currentLang: any;
  INR: string;
  backbtn: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private langService: LanguageService,
    @Inject(App_Service_Config) public config: string,
    private http: HttpClient
  ) {
    this.final_amount = this.router.getCurrentNavigation()?.extras.state?.['finalAmount'];
    this.endUserData = this.router.getCurrentNavigation()?.extras.state?.['endUserData']
    this.depositerVpa = this.endUserData?.vpa
    this.depositerName = this.endUserData?.name;
    this.paymentType = this.router.getCurrentNavigation()?.extras.state?.['paymentType'];
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        this.router.navigate(['../qr-code'], { relativeTo: this.route.parent })
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.router.navigate(['../new-bill'], { relativeTo: this.route.parent });
      },
    },
  ];

  ngOnInit() {
    this.langService.currentLang.subscribe((data) => {
      this.currentLang = data;
      this.title =
        this.paymentType === 'q' ? data?.PAYMENT_QR : data?.PAYMENT_C;
      this.INR = data?.INR_Amount;
      this.backbtn = data?.BACK;
    });
    this.partyName = this.loginService.loginData.userInfo.Party_Name;
    this.http
      .post(`${this.config}/ccsa/initiateTransaction`, {
        vpa: this.depositerVpa,
        amount: this.final_amount,
        payment_mode: this.paymentType,
      })
      .subscribe((data: any) => {
        this.refNo = data?.appRefNo;
        this.logotext = data?.displayMsg;
        this.logoimg = 'data:image/png;base64,' + data?.switchLogo;
        if (this.paymentType === 'q') {
          this.qrString = `upi://pay?pa=${this.depositerVpa}&pn=${this.depositerName}&am=${this.final_amount}&tr=${this.refNo}`;
        }
      });

  }

  backqr() {
    this.router.navigate(['../new-bill'], { relativeTo: this.route.parent });
  }

  paymentHandler() {
    this.http
      .post(`${this.config}/cashcollect`, {
        vpa: this.depositerVpa,
        amount: this.final_amount,
        payment_mode: this.paymentType,
        AppRefSrNo: this.refNo,
      })
      .subscribe({
        next(data: any) {
          console.log(data)
        },
        complete() {
          console.log('Payment Completed!!!');
        },
        error(err) {
          console.log(err);
        },
      });
  }

  closeAlert(e: any) {
    console.log(e.detail.role);

  }
}
