import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.page.html',
  styleUrls: ['./terms-condition.page.scss'],
})
export class TermsConditionPage{

  dateOfLastUpdate = new Date('2023-08-31');
  constructor() {
    // console.log('this is last update', this.dateOfLastUpdate);
  }

  

}
