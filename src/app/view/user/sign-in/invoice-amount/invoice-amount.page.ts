import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/services/language/language.service';
import { GoldService } from './service/gold.service';

@Component({
  selector: 'app-invoice-amount',
  templateUrl: './invoice-amount.page.html',
  styleUrls: ['./invoice-amount.page.scss'],
})
export class InvoiceAmountPage implements OnInit {
  //variables
  depositerVpa: string;
  eassebuzzlogo: string;
  logotext: string;
  title: any;

  enterUserData: any;
  amount: any;
  depositerName: any;

  //language
  currentLang: any;
  Generate_qr: string;
  back: string;
  amountPlaceHolder: string;

  isButtonDisabled: boolean;

  // DIALOG Box
  isDialogOpen: boolean = false;
  headerMsg: string = '';
  message: string = '';
  public alertButtons = [
    {
      text: 'Ok',
      role: 'confirm',
      handler: () => {
        this.isDialogOpen = false;
        this.router.navigateByUrl(`views/user/signin/new-bill`);
      },
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private goldService: GoldService
  ) {
    this.enterUserData =
      this.router.getCurrentNavigation()?.extras.state?.['userData'];
    this.depositerVpa = this.enterUserData.vpa;
  }

  ngOnInit() {
    this.languageService.currentLang.subscribe((data) => {
      this.currentLang = data;
    });
    this.title = this.currentLang?.DEPOSITORS_AMOUNT;
    this.Generate_qr = this.currentLang?.GENRATE_QR;
    this.back = this.currentLang?.BACK;
    this.amountPlaceHolder = this.currentLang?.AMOUNTINPUT_PLACEHOLDER;
  }

  generateHandler(type: string) {
    if (this.amount > 0) {
      this.isButtonDisabled = false;
      this.router.navigate(['../qr-code'], {
        relativeTo: this.route.parent,
        state: {
          finalAmount: this.amount,
          endUserData: this.enterUserData,
          paymentType: type,
        },
      });
    }
  }

  handleBack() {
    this.router.navigate(['../new-bill'], { relativeTo: this.route.parent });
  }

  // isButtonDisabled:boolean=false
  checkCondition() {
    if (!this.amount.value || this.amount.value <= 0) {
      this.isButtonDisabled = true;
    }
  }

  handleGoldAuth() {
    this.goldService
      .login(this.depositerVpa, { email: '', password: '' })
      .subscribe({
        next: async (res: any) => {
          if (res.JWT) {
            console.log(res.JWT);
            const goldRes = await fetch(
              `http://192.168.1.12:4001/user/goldSilver/gSBuy?amount=${this.amount}`,
              {
                method: 'POST',
                body: JSON.stringify({ metalType: 'GOLD', quantity: '' }),
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: res.JWT,
                },
              }
            );
            const goldData = await goldRes.json();
            this.isDialogOpen = true;
            if (goldData.event === 'sucess') {
              this.headerMsg = 'Purchase Successfull 🎉';
              this.message = `You have successfully purchased the Gold you can check it in your profile.`;
            } else {
              this.isDialogOpen = true;
              this.headerMsg = 'Purchase Failed ❌';
              this.message =
                'Your purchased failed Your money will be back to your account!';
            }
            console.log('**********', goldData);
          }
        },
        error: (err) => {
          console.log(err);
          this.router.navigateByUrl('/views/user/signin-gold', {
            state: { vpa: this.depositerVpa },
          });
        },
      });
  }
}
