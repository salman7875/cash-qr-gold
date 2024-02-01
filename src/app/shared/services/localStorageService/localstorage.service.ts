import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  getItem(key: string){
    return localStorage.getItem(key)
  }
  setItem(key:string , value:string){
     localStorage.setItem(key , value)
  }
  removeItem(key:string){
     localStorage.removeItem(key)
  }
}
