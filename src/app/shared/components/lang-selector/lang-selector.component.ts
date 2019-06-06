import { HostService } from './../../../services/host.service';
import { BasicSelect } from './../../interfaces/interfaces';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent {

  private defaultLang = '';

  langs: BasicSelect[] = [
    {value: 'de', viewValue: 'de'},
    {value: 'en', viewValue: 'en'},
    {value: 'fr', viewValue: 'fr'}
  ];

  constructor(private host: HostService) {
    this.host.getBrowserLang().subscribe((l) => {
      if (l.indexOf('_') !== -1) { // Handle en-US formatted locale
        this.defaultLang = l.split('_')[0];
      } else {
        this.defaultLang = l;
      }
    });
   }

}
