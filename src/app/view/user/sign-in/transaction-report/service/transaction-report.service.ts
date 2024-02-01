import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { distinct, map, mergeMap, toArray } from 'rxjs';
import { App_Service_Config } from 'src/app/appConfig/appConfig';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionReportService {

   //variable
   private cache$: ReplaySubject<any>;

   constructor(
     @Inject(App_Service_Config) public config: string,
     private http: HttpClient
   ) {}
 
   //caching methods
   // transactionHistory(reload: boolean = false, body:any) {
   //   if (!this.cache$ || reload) {
   //     if (!this.cache$) {
   //       this.cache$ = new ReplaySubject(1);
   //     }
   //     this.applyCustom(body).subscribe((data) => this.cache$.next(data));
   //   }
 
   //   return this.cache$.asObservable();
   // }
   
 //trasanctionhistory
   applyCustom(body:any) {
     return this.http.post(`${this.config}/ccsa/transactionHistory`, body)
     .pipe(
       map((response: any) => response.msg),
       mergeMap((msg: any[]) => msg),
       distinct((transaction: any) => transaction.TxnId),
       toArray()
     );
   }
}
