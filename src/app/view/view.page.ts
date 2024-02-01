import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { LanguageService } from '../shared/services/language/language.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {


  constructor(private languageService: LanguageService) { }

  async ngOnInit () {
    const { value }: any = await Preferences.get({ key: 'lang' });
    if (!value){
      this.languageService.setLang("eng")
    }else{
      this.languageService.setLang(value);
    };
  }

}
