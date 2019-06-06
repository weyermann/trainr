import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuntimeService {

  constructor() { }

  // LANGUAGE CHANGE

  // Observable string sources
  public languageChangedSource = new Subject<string>();

  // Observable string streams
  languageChanged$ = this.languageChangedSource.asObservable();

  // Service message commands
  changeLanguage(lang: string) {
    this.languageChangedSource.next(lang);
  }

}
