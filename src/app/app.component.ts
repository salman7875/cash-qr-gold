import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { LocalstorageService } from './shared/services/localStorageService/localstorage.service';
import { LanguageService } from './shared/services/language/language.service';
import { Share } from '@capacitor/share';
import { LoginService } from './view/user/login/service/login.service';
import { TransactionReportService } from './view/user/sign-in/transaction-report/service/transaction-report.service';
import { format } from 'date-fns';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  message: any = null;
  sender: string;
  amount: string;
  isModalOpen = false;
  appRefNo: any;
  txn: any;
  textToShare: string;

  //languages
  title: any;
  ok: any;

  //ChId
  chIds: any;

  // collection Agent Info
  collectionAgentInfo: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalstorageService,
    private languageService: LanguageService,
    private loginService: LoginService,
    private transactionService: TransactionReportService
  ) {}
  ngOnInit() {
    console.log('Initializing HomePage');

    //setting language
    this.title = this.languageService.currentLang.subscribe((data) => {
      this.ok = data?.OK;
      this.title = data?.MONEY_RECEIVED;
    });

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      console.log('token', token.value);
      this.localStorageService.setItem('browserToken', token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notifications: PushNotificationSchema) => {
        this.message = notifications?.body;
        this.router.navigate(['signin/new-bill'], {
          relativeTo: this.route.parent,
        });
        console.log('message recieved android', notifications);
        this.isModalOpen = true;
        // const amountPattern =/\INR\.\d+(\.\d+)?/;
        const amountPattern = /\d+(\.\d+)?/;
        const receivedFromPattern = /received from (.*?) Ref no -/;
        const receivedFromMatch = this.message.match(receivedFromPattern);
        console.log(receivedFromMatch);
        const amountMatch = this.message.match(amountPattern);
        console.log(amountMatch);
        // let text =
        //   'AED.20.00 received from Admiral General Aladeen. Ref no - CCSA/9/21';
        let refNoPattern = /Ref no - (.*)/;
        let refNo = this.message.match(refNoPattern);
        console.log(this.message);
        console.log(refNo[1]);
        if (
          receivedFromMatch &&
          receivedFromMatch[1] &&
          amountMatch &&
          amountMatch[0] &&
          refNo &&
          refNo[1]
        ) {
          this.sender = receivedFromMatch[1];
          console.log(this.sender);
          this.amount = `INR. ${amountMatch[0]}`;
          this.appRefNo = refNo[1];

          //txn api call and filter the transaction
          this.chIds = this.loginService.loginData?.endUsers?.map(
            (e: any) => e.chId
          );

          let startDate: any = new Date();
          let year = startDate.getFullYear();
          startDate.setFullYear(year - 1);
          startDate = format(startDate, 'yyyy-MM-dd');
          let endDate: any = new Date();
          endDate = format(endDate, 'yyyy-MM-dd');

          console.log('ChIds appts  : ', this.chIds);
          console.log('startDate : ', startDate);
          console.log('endDate : ', endDate);

          const data = {
            chIds: this.chIds,
            endDate: endDate,
            startDate: startDate,
          };
          this.collectionAgentInfo = this.loginService.loginData.userInfo;
          this.transactionService.applyCustom(data).subscribe((data: any) => {
            console.log('transaction data in app.ts : ', data);
            this.txn = data.filter(
              (txn: any) => txn.Mct_App_RefNo === this.appRefNo
            )[0];
            console.log('this is txn : ', this.txn);
          });
        } else {
          console.log('Pattern not matched.');
        }
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
  closeModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async Share() {
    console.log(this.collectionAgentInfo);
    this.textToShare = `Agent Name: ${
      this.collectionAgentInfo?.F_name + ' ' + this.collectionAgentInfo?.L_name
    } \nApp Ref. Number: ${this.txn.Mct_App_RefNo} \nTxn Number: ${this.txn.unique_transaction_reference} \nAccount Number: ${
      this.txn.remitter_account_number
    } \nCustomer Name: ${this.sender} \nCollected Amount: ${
      this.txn.amount
    } \nCollectionDate: ${format(
      new Date(this.txn.created_at.replace(/ /g, '')),
      'dd-MM-yyyy'
    )} \n`;
    console.log(this.textToShare);
    if(this.collectionAgentInfo){
      await Share.share({
        title: 'Share via',
        text: this.textToShare,
        dialogTitle: 'Share',
      });
    }
  }
}
