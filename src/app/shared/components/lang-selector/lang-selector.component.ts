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
    // this.host.getBrowserLang().subscribe(l => {
    //   if (l.indexOf('_') !== -1) {
    //     // Handle en-US formatted locale
    //     this.defaultLang = l.split('_')[0];
    //   } else {
    //     this.defaultLang = l;
    //   }
    // });
  }

  languageChanged(lang: string) {
    this.languageCode = lang.toUpperCase();
    // Call global Language Service to set the new language and inform observers
    this.runtimeService.changeLanguage(lang);
  }
}
