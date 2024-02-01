import {Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { App_Service_Config } from 'src/app/appConfig/appConfig';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  langVars: any = {};
  private dataSource = new BehaviorSubject<any>({});
  currentLang = this.dataSource.asObservable();

  constructor(
    @Inject(App_Service_Config) public config: string,
    private http: HttpClient
  ) {}

  async setLang(lang: string) {
    const { value }: any = await Preferences.get({ key: 'langVars' });
    await Preferences.set({ key: 'lang', value: lang });
    
    if (this.langVars[lang]) {
      // data stored in the currentlang variable
      this.dataSource.next(this.langVars[lang]);
    } else if (value && value[lang]) {
      // data stored in the both currentlang and langVars variable
      this.dataSource.next(value[lang]);
      this.langVars[lang] = value[lang];
    } else {
      this.http.get(`${this.config}/ccsa/setLanguagePreference?language=${lang}`).subscribe(async (data) => {
        // data stored in the both currentlang variable, langVars variable and preferences storage
        this.dataSource.next(data);
        this.langVars[lang] = data;
        await Preferences.set({
          key: 'langVars',
          value: this.langVars,
        });
      });
    }
  }
}

