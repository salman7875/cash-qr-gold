import { Component, OnInit } from '@angular/core';
import { TransactionReportService } from './service/transaction-report.service';

import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { LanguageService } from 'src/app/shared/services/language/language.service';
import { LoginService } from '../../login/service/login.service';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface FilterData {
  upiIds?: any[];
  page: number;
  pageSize?: number;
  startDate?: string[];
  endDate?: string[];
  status?: any[];
  mode?: any[];
  month?: any[];
}

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.page.html',
  styleUrls: ['./transaction-report.page.scss'],
})
export class TransactionReportPage implements OnInit {
  paymentSource: any = [{ id: 1, title: 'SBI Bank - 8888' }];
  paymentStatus: any = [
    { id: 1, title: 'Successful' },
    { id: 2, title: 'Pending' },
    { id: 3, title: 'Unsetteled' },
    { id: 4, title: 'Failed' },
  ];

  paymentType: any = [
    { id: 1, title: 'IMPS' },
    { id: 2, title: 'CASH' },
    { id: 3, title: 'UPI' },
    { id: 3, title: 'GOLD' },
  ];
  paymentMonths: any = [];

  selectedStatus = [];
  selectedMode = [];
  selectedMonths = [];

  //variable
  isModalOpen: boolean = false;
  yearTransactionHistory: any; // Transaction history of the all the users for the last year
  endUsers: any; //All the end users of the collection agent
  chIds: any; // Ch_Ids of the end users
  selectedUserChId: any = 'all'; // ch id of the selected end user
  filteredTxnHistory: any; //transaction history that is being showed to the user
  frombtn: string;
  tobtn: string;

  // variables for date and time
  selectMode: string = 'Today'; // Today | Week | Month | Year
  fromShowPicker: boolean = false;
  toShowPicker: boolean = false;
  fromDateFormattedString: any;
  toDateFormattedString: any;

  currentLang: any;

  // TRANSACTION FILTER DATA
  filterData: FilterData = {
    page: 1,
  };

  constructor(
    private tracsactionService: TransactionReportService,
    private langservice: LanguageService,
    private loginService: LoginService
  ) {
    this.langservice.currentLang.subscribe((data) => {
      this.currentLang = data;
      this.frombtn = data?.FROM;
      this.tobtn = data?.TO;
    });
    //language variable assign
    this.frombtn = this.currentLang?.FROM;
    this.tobtn = this.currentLang?.TO;

    this.endUsers = this.loginService.loginData?.endUsers;
    console.log('EndUsers', this.endUsers);

    this.chIds = this.loginService.loginData?.endUsers?.map((e: any) => e.chId);
    console.log('ChIds  : ', this.chIds);
    this.transactionData();
  }
  ngOnInit() {
    let today = new Date();
    const unformatedDate = this.getMonthsList(today);
    this.paymentMonths = unformatedDate.map((item) => ({
      id: Math.random(),
      title: `${MONTHS[item.month]}${item.year.toString().substring(2)}`,
      startDate: item.startDate,
      endDate: item.endDate,
    }));
    console.log(this.paymentMonths);

    let year = today.getFullYear();
    today.setFullYear(year - 1);
    let formYear = format(today, 'yyyy-MM-dd') + 'T09:00:00.000Z';
    this.fromDateFormattedString = format(parseISO(formYear), 'yyyy-MM-dd');
    // this.endUsers = this.loginService.loginData?.endUsers.map((user: any) => {
    //   for (let i = 0; i < this.yearTransactionHistory.length; i++) {
    //     if (
    //       user.chId ==
    //       this.yearTransactionHistory[i].Mct_App_RefNo.split('/')[1]
    //     ) {
    //       if (this.yearTransactionHistory[i].endUserAccountNo?.length > 0) {
    //         user.accountNumber =
    //           this.yearTransactionHistory[i].endUserAccountNo;
    //       }
    //       return user;
    //     }
    //     return user;
    //   }
    // });
  }

  getMonthsList(date: Date) {
    const currentMonth = date.getMonth(); // 0-indexed
    const currentYear = date.getFullYear();

    const months = [];
    // Start from April of the previous year
    let year = currentYear - 1;
    let month = currentMonth;

    // Iterate until the current month of the current year
    while (!(year === currentYear && month === currentMonth)) {
      months.push({
        year,
        month: month,
        startDate: new Date(year, month, 1).toLocaleDateString(),
        endDate: new Date(year, month + 1, 0).toLocaleDateString(),
      }); // Adding 1 to month to make it 1-indexed
      month++;
      if (month > 11) {
        // Reset month to January and increment the year
        month = 0;
        year++;
      }
    }

    return months;
  }

  transactionData(start: any = '', end: any = '') {
    let startDate: any = new Date();
    let endDate: any = new Date();
    let year = startDate.getFullYear();
    startDate.setFullYear(year - 1);
    startDate = start ? start : startDate;
    endDate = end ? end : endDate;
    startDate = format(startDate, 'yyyy-MM-dd');
    endDate = format(endDate, 'yyyy-MM-dd');
    const data = { chIds: this.chIds, startDate, endDate };
    console.log(startDate, endDate);
    this.tracsactionService.applyCustom(data).subscribe((data: any) => {
      this.yearTransactionHistory = data.reverse();
      console.log('Year Txn History', this.yearTransactionHistory);
      this.yearTransactionHistory.map((data: any) => {
        // console.log(data.VA_label);
        for (let i = 0; i < this.loginService.loginData.endUsers.length; i++) {
          let username = this.loginService.loginData.endUsers[i].name;
          username = username.replace(/ /g, '').toLowerCase();
          if (username === data.VA_label.toLowerCase()) {
            return (data.VA_label =
              this.loginService.loginData.endUsers[i].name);
          }
          return;
        }
      });

      // this.endUsers = this.loginService.loginData?.endUsers.map((user: any) => {
      //   for (let i = 0; i < this.yearTransactionHistory.length; i++) {
      //     // this.yearTransactionHistory[i].endUserAccountNo = '123';
      //     if (
      //       user.chId ==
      //       this.yearTransactionHistory[i].Mct_App_RefNo.split('/')[1]
      //     ) {
      //       user.accountNumber =
      //         this.yearTransactionHistory[i].endUserAccountNo;
      //       return user;
      //     }
      //     user.accountNumber = null;
      //     return user;
      //   }
      // });
      // console.log(this.endUsers);

      this.dateForFilter({ value: this.selectMode });
    });
  }

  dateForFilter(enteredFilter: any) {
    this.selectMode = enteredFilter.value;
    if (this.selectMode == 'Today') {
      this.setToday();
    } else if (this.selectMode == 'Week') {
      this.setWeek();
    } else if (this.selectMode == 'Month') {
      this.setMonth();
    } else if (this.selectMode == 'Year') {
      this.setYear();
    } else if (this.selectMode == 'Custom') {
      this.setCustom();
    }
  }

  handleNameChange(e: any) {
    this.selectedUserChId = e.detail.value;
    this.dateForFilter({ value: this.selectMode });
  }

  setToday() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    // console.log(today)
    this.filter(today);
  }
  setWeek() {
    let today = new Date();
    let week = today.getDate();
    today.setDate(week - 7);
    let formWeek = format(today, 'yyyy-MM-dd') + 'T09:00:00.000Z';
    this.fromDateFormattedString = format(parseISO(formWeek), 'yyyy-MM-dd');
    //this is filtering the data as per the date
    this.filter(this.fromDateFormattedString);
  }
  setMonth() {
    let today = new Date();
    let month = today.getMonth();
    today.setMonth(month - 1);
    let formMonth = format(today, 'yyyy-MM-dd') + 'T09:00:00.000Z';
    this.fromDateFormattedString = format(parseISO(formMonth), 'yyyy-MM-dd');
    //this is filtering the data as per the date
    this.filter(this.fromDateFormattedString);
  }
  setYear() {
    let today = new Date();
    let year = today.getFullYear();
    today.setFullYear(year - 1);
    let formYear = format(today, 'yyyy-MM-dd') + 'T09:00:00.000Z';
    this.fromDateFormattedString = format(parseISO(formYear), 'yyyy-MM-dd');
    //this is filtering the data as per the date
    this.filter(this.fromDateFormattedString);
  }

  filter(startdate: any) {
    startdate = new Date(startdate);
    if (this.selectedUserChId === 'all') {
      this.filteredTxnHistory = this.yearTransactionHistory.filter(
        (txnDate: any) => {
          const dataDate = new Date(txnDate.created_at);
          return dataDate >= startdate;
        }
      );
    } else {
      console.log(this.selectedUserChId);
      this.filteredTxnHistory = this.yearTransactionHistory.filter(
        (txnDate: any) => {
          const dataDate = new Date(txnDate.created_at);

          // console.log(txnDate.Mct_App_RefNo == 'CCSA/21/1')

          return (
            dataDate >= startdate &&
            txnDate.Mct_App_RefNo.split('/')[1] == this.selectedUserChId
          );
        }
      );
    }
  }

  setCustom() {
    let today = new Date();
    this.toDateFormattedString = format(
      parseISO(format(today, 'yyyy-MM-dd') + 'T09:00:00.000Z'),
      'yyyy-MM-dd'
    );
    let year = today.getFullYear();
    today.setFullYear(year - 1);
    this.fromDateFormattedString = format(
      parseISO(format(today, 'yyyy-MM-dd') + 'T09:00:00.000Z'),
      'yyyy-MM-dd'
    );
  }
  customFromDate(enteredDate: any) {
    console.log('From date enter (raw) ', enteredDate);
    this.fromDateFormattedString = format(parseISO(enteredDate), 'yyyy-MM-dd');
    console.log('From date enter (formatted) ', this.fromDateFormattedString);

    this.fromShowPicker = false;
  }
  customToDate(enteredDate: any) {
    console.log('To date enter (raw) ', enteredDate);
    this.toDateFormattedString = format(parseISO(enteredDate), 'yyyy-MM-dd');
    console.log('To date enter (formatted) ', this.toDateFormattedString);

    this.toShowPicker = false;
  }
  applyCustom() {
    console.log('from date :', this.fromDateFormattedString);
    console.log('To date :', this.toDateFormattedString);
    const data = {
      chIds: this.chIds,
      startDate: this.fromDateFormattedString,
      endDate: this.toDateFormattedString,
    };
    this.tracsactionService.applyCustom(data).subscribe((data) => {
      this.filteredTxnHistory =
        this.selectedUserChId === 'all'
          ? data.reverse()
          : data
              .reverse()
              .filter(
                (e) => e.Mct_App_RefNo.split('/')[1] == this.selectedUserChId
              );
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // this.transactionData();
      // event.target.cancel();
      // const refresherContent = document.querySelector('ion-refresher-content');
      // if (refresherContent) {
      //   refresherContent.innerHTML = 'Refresh canceled';
      // }
      console.log(event);
      this.transactionData();
      event.target.complete();
    }, 200);
  }

  handleModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  handleSelectFilter(type: any, data: any) {
    console.log(type, data);
    if (type === 'status') {
      this.addData(this.filterData, type, data);
    } else if (type === 'mode') {
      this.addData(this.filterData, type, data);
    } else if (type === 'month') {
      if (!this.filterData['startDate'] || !this.filterData['endDate']) {
        this.filterData['startDate'] = [];
        this.filterData['endDate'] = [];
      }
      this.filterData['startDate'].push(data.startDate);
      this.filterData['endDate'].push(data.endDate);
    }
  }

  handleFilter() {
    console.log(this.filterData);
  }

  addData(parent: any, type: any, data: any) {
    if (!parent[type]) {
      parent[type] = [];
    }
    parent[type]?.push(data);
  }

  isChipOutlined(type: keyof FilterData, id: number) {
    const selectedChips: any = this.filterData[type] || [];
    const isSelected = selectedChips.some((chip: any) => chip.id === id);
    return !isSelected;
  }
}
