import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/shared/services/localStorageService/localstorage.service';
import { GoldService } from '../sign-in/invoice-amount/service/gold.service';

@Component({
  selector: 'app-signin-gold',
  templateUrl: './signin-gold.page.html',
  styleUrls: ['./signin-gold.page.scss'],
})
export class SigninGoldPage implements OnInit {
  depositorVpa: any;
  firstName = '';
  lastName = '';
  state = '';
  city = '';
  address: '';
  aadharNo: '';
  country: '';
  personalData = {
    Name: '',
    emailId: '',
    dateOfBirth: '',
    password: '',
    mobileNumber: '',
    userPincode: '',
    userStateCode: '',
    userCityCode: '',

    nomineeName: '',
    nomineeDateOfBirth: '',
    nomineeRelation: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
  };
  selectedElement: string = '';

  states: any = [];
  statePage = 1;
  stateName: string = '';

  cities: any = [];
  cityPage = 1;
  cityName: string = '';
  constructor(
    private localStorage: LocalstorageService,
    private goldService: GoldService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchStates(this.stateName, this.statePage);
    this.fetchCities(
      this.personalData.userStateCode,
      this.cityName,
      this.cityPage
    );
    this.depositorVpa =
      this.router.getCurrentNavigation()?.extras.state?.['vpa'];
    console.log('*********', this.depositorVpa);
  }

  handleFocus(element: string) {
    this.selectedElement = element;
  }

  fetchStates(stateName: any, pageNo: any) {
    this.goldService.getStates({ stateName, pageNo }).subscribe((res: any) => {
      this.states = res.result.data;
    });
  }

  fetchCities(id: any, cityName: any, pageNo: any) {
    this.goldService
      .getCities({ id, cityName, pageNo })
      .subscribe((res: any) => {
        this.cities = res.result.data;
      });
  }

  handleSelectStates(data: any) {
    // this.selectedElement = null;
    if (data.el === 'state') {
      this.state = data.name;
      this.personalData.userStateCode = data.id;
    } else if (data.el === 'city') {
      this.city = data.name;
      this.personalData.userCityCode = data.id;
    }
  }

  handleInfinite(event: any) {
    console.log(event);
    event.target.complete();
  }

  handleSearch(event: any, element: string) {
    const name = event.target.value;
    if (element === 'city') {
      this.fetchCities(this.personalData.userStateCode, name, this.cityPage);
    } else if (element === 'state') {
      this.fetchStates(name, this.statePage);
    }
  }

  async showToast(msg: string) {
    // await Toast.show({ text: msg, position: 'center', duration: 'long' });
  }

  handlePersonalInfo() {
    this.personalData.Name = this.firstName + this.lastName;
    console.log(this.personalData);

    // localStorage.setItem('signup', JSON.stringify(this.personalData))
    this.localStorage.setItem('signup', JSON.stringify(this.personalData));
    // this.router.navigate(['signin/selfie']);
    this.goldService
      .signin(this.depositorVpa, this.personalData)
      .subscribe((res: any) => {
        if (res.Event === 'success') {
          this.showToast('Purchased Successfully!');
          this.localStorage.removeItem('signup');
          this.router.navigateByUrl('/login');
        } else {
          console.log(`Error while onboarding user.`);
          this.showToast('Failed Transaction!');
        }
      });
  }

  handleRetake() {
    this.firstName = '';
    this.lastName = '';
    this.personalData.emailId = '';
    this.personalData.mobileNumber = '';
    this.aadharNo = '';
  }
}
