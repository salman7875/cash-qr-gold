import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/shared/services/language/language.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.enterUserData =
      this.router.getCurrentNavigation()?.extras.state?.['userData'];
    this.depositerName = this.enterUserData?.name;
    this.depositerVpa = this.enterUserData?.vpa
  }

  ngOnInit() {
    this.languageService.currentLang.subscribe(data => {
      this.currentLang = data;
    })
    this.title = this.currentLang?.DEPOSITORS_AMOUNT
    this.Generate_qr = this.currentLang?.GENRATE_QR
    this.back = this.currentLang?.BACK
    this.amountPlaceHolder = this.currentLang?.AMOUNTINPUT_PLACEHOLDER
  }
  isButtonDisabled: boolean;

  generateHandler(type: string) {
    if (this.amount > 0) {
      this.isButtonDisabled = false
      this.router.navigate(['../qr-code'], {
        relativeTo: this.route.parent,
        state: {
          finalAmount: this.amount,
          depositerName: this.depositerName,
          vpa: this.depositerVpa,
          paymentType: type
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
      this.isButtonDisabled = true
    }
  }

}
