import { Component, OnInit } from '@angular/core';
import { TransactionReportService } from './service/transaction-report.service';

import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { LanguageService } from 'src/app/shared/services/language/language.service';
import { LoginService } from '../../login/service/login.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

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
  page: any;
  pageSize?: any;
  startDate?: any;
  endDate?: any;
  upiIds?: any[];
  status?: any;
  paymentMode?: any[];
  month?: any[];
}

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.page.html',
  styleUrls: ['./transaction-report.page.scss'],
})
export class TransactionReportPage implements OnInit {
  paymentStatus: any = [
    { id: 1, title: 'received' },
    { id: 2, title: 'unsettled' },
  ];

  paymentType: any = [
    { id: 1, title: 'IMPS' },
    { id: 2, title: 'CASH' },
    { id: 3, title: 'UPI' },
  ];
  paymentMonths: any = [];

  paymentHistory: any = [];
  endUsers: any = [];

  formData: any = {}

  //variable
  isModalOpen: boolean = false;
  yearTransactionHistory: any; // Transaction history of the all the users for the last year
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
  stopScrolling: boolean = false;

  isRangeOpen: boolean = false;
  // TRANSACTION FILTER DATA
  filterData: FilterData = {
    page: 1,
  };

  constructor(
    private transactionService: TransactionReportService,
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
    this.endUsers = this.endUsers.map((user: any) => ({ ...user, id: Math.random() }))
    console.log('EndUsers', this.endUsers);

    this.chIds = this.loginService.loginData?.endUsers?.map((e: any) => e.chId);
    console.log('ChIds  : ', this.chIds);
  }
  ngOnInit() {
    const formData: FilterData = {
      page: 1,
      pageSize: 5
    }
    this.formData = {
      page: 1,
      pageSize: 5
    }
    this.transactionService.applyCustom(this.formData).subscribe((res: any) => {
      this.paymentHistory = res.data
    });
    let today = new Date();
    const unformatedDate = this.getMonthsList(today);
    this.paymentMonths = unformatedDate.map((item) => ({
      id: Math.random(),
      title: `${MONTHS[item.month]}${item.year.toString().substring(2)}`,
      startDate: item.startDate,
      endDate: item.endDate,
    }));


    let year = today.getFullYear();
    today.setFullYear(year - 1);
    let formYear = format(today, 'yyyy-MM-dd') + 'T09:00:00.000Z';
    this.fromDateFormattedString = format(parseISO(formYear), 'yyyy-MM-dd');
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

  handleNameChange(e: any) {
    this.selectedUserChId = e.detail.value;
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

  customDate(type: string, enteredDate: any) {
    if (type === 'start') {
      this.filterData.startDate = format(parseISO(enteredDate), 'yyyy-MM-dd');

    } else {
      this.filterData.endDate = format(parseISO(enteredDate), 'yyyy-MM-dd');
    }
    this.filterData.month = [];
    this.toShowPicker = false;
  }

  handleRefresh(event: any) {
    this.transactionService.applyCustom(this.formData).subscribe((res: any) => {
      event.target.complete()
    })
  }

  handleModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  handleSelectFilter(type: keyof FilterData, data: any) {
    const dataExists = this.filterData[type]?.find((d: any) => d.id ? d.id == data.id : d == data);

    if (dataExists) {
      if (
        type === 'status' ||
        type === 'month' ||
        type === 'paymentMode' ||
        type === 'upiIds'
      ) {
        const index = this.filterData[type]?.findIndex((d: any) => d.id ? d.id === data.id : d === data)

        this.filterData[type]?.splice(index, 1)
        if (this.filterData[type].length < 1) {
          delete this.filterData[type]
        }
        return
      }
    }

    if (type === 'month') {
      if (!this.filterData[type]) {
        this.filterData[type] = [];
      }

      this.filterData[type]?.push(data);
      const sortedMonths = this.filterData['month']?.sort(this.sortMonths);
      this.filterData['startDate'] = format(sortedMonths?.at(0).startDate, 'yyyy-MM-dd');
      this.filterData['endDate'] = format(sortedMonths?.at(-1).endDate, 'yyyy-MM-dd');
    } else if (type === 'status' || type === 'paymentMode') {
      if (!this.filterData[type]) {
        this.filterData[type] = [];
      }
      this.filterData[type]?.push(data);
    } else if (type === 'upiIds') {
      if (!this.filterData['upiIds']) {
        this.filterData['upiIds'] = [];
      }
      this.filterData['upiIds']?.push(data)
    }
  }

  handleFilter() {
    this.filterData.page = 1
    const { month, ...other } = this.filterData;
    console.log(other);


    this.stopScrolling = false

    const formData: any = {};
    for (const data of Object.entries(other)) {
      if (Array.isArray(data[1])) {
        if (!formData[data[0]]) {
          this.formData[data[0]] = [];
        }
        data[1].forEach(d => {
          if (d.title) {
            this.formData[data[0]]?.push(d.title)
          } else {
            this.formData[data[0]]?.push(d)
          }
        })
      } else {
        this.formData[data[0]] = data[1];
      }
      console.log('++++++++++++++++++', data);

    }
    this.formData.pageSize = 5

    this.transactionService.applyCustom(this.formData).subscribe((res: any) => {
      this.paymentHistory = res.data
      this.isModalOpen = false
    });
  }

  isChipOutlined(type: keyof FilterData, id: number) {
    let isSelected = true;
    if (
      type === 'month' ||
      type === 'status' ||
      type === 'paymentMode' ||
      type === 'upiIds'
    ) {
      isSelected = this.filterData[type]?.find((d: any) => d.id ? d.id === id : d === id);
    }
    return !isSelected ? true : false;
  }

  sortMonths(a: any, b: any) {
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  }

  openCustom() {
    this.isRangeOpen = !this.isRangeOpen;
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (!this.stopScrolling) {
      this.filterData.page++
    }

    this.transactionService.applyCustom({ page: this.filterData.page, pageSize: 5 }).subscribe((res: any) => {
      if (res.data.length < 1) {
        this.stopScrolling = true
        this.filterData.page = 1
      } else {
        this.paymentHistory = [...this.paymentHistory, ...res.data]
      }

      event.target.complete()
    })
  }
}
