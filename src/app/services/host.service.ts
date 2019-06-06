import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor() { }

  getBrowserLang(): Observable<any> {
    let userlang = '';
    userlang = navigator.language || navigator.languages[0];
    console.log('User language from service: ', userlang);

    return of(userlang);
  }
}
