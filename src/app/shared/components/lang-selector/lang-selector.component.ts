import { RuntimeService } from './../../../services/runtime.service';
import { HostService } from './../../../services/host.service';
import { BasicSelect } from './../../interfaces/interfaces';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent {
  private defaultLang = '';
  public languageCode = '';

  langs: BasicSelect[] = [
    { value: 'de', viewValue: 'de' },
    { value: 'en', viewValue: 'en' },
    { value: 'fr', viewValue: 'fr' }
  ];

  constructor(
    private host: HostService,
    private runtimeService: RuntimeService
  ) {
    this.host.getBrowserLang().subscribe(l => {
      if (l.indexOf('-') !== -1) {
        // Handle en-US formatted locale
        this.defaultLang = l.split('-')[0];
      } else {
        this.defaultLang = l;
      }
      if (!this.defaultLang || this.defaultLang === '') {
        // alert('no browser lang');
        this.defaultLang = 'en';
      } else {
        // alert('browser lang is ' + this.defaultLang);
      }
      // set display value and broadcast language
      this.languageCode = this.defaultLang;
      this.runtimeService.changeLanguage(this.defaultLang);
    });
  }

  languageChanged(lang: string) {
    this.languageCode = lang.toUpperCase();
    // Call global Language Service to set the new language and inform observers
    this.runtimeService.changeLanguage(lang);
  }
}
