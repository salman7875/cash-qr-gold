import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { App_Service_Config } from 'src/app/appConfig/appConfig';
import { LocalstorageService } from 'src/app/shared/services/localStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class GoldService {
  token: any
  constructor(@Inject(App_Service_Config) private config: string, private localStorageService: LocalstorageService, private http: HttpClient) {
    this.token = localStorageService.getItem('token1')
  }

  login(vpa: any, data: any) {
    return this.http.post(`http://192.168.1.10:4001/user/login?UPI=${vpa}`, data)
  }

  signin(data: any) {
    return this.http.post(`http://192.168.1.10:4001/subadmin/userOnboard`, data)
  }

  getStates({ stateName, pageNo }: any) {
    return this.http.get(`http://192.168.1.10:4001/getstates?count=100&name=${stateName}&page=${pageNo}`)
  }

  getCities({ id, cityName, pageNo }: any) {
    return this.http.get(`http://192.168.1.10:4001/getcities?stateId=${id}&count=100&name=${cityName}&page=${pageNo}`)
  }

  async buyGold(token: any, data: any, amount: any) {
    const res = await fetch(`http://192.168.1.10:4001/user/goldSilver/gSBuy?amount=${amount}`, {
      method: 'POST',
      headers: {
        'Authorization': token
      },
      body: JSON.stringify(data)
    })
    return await res.json()
    // return this.http.post(`http://192.168.1.10:4001/user/goldSilver/gSBuy?amount=${amount}`, data, { headers: { 'Authorization': token } })
  }
}
