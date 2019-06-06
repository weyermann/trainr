import { RuntimeService } from './services/runtime.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService, private runtimeService: RuntimeService) {
    translate.setDefaultLang('de');

    // Subscribe to language changed subject
    this.runtimeService.languageChanged$.subscribe(
      lang => {
        this.translate.use(lang);
      });
  }
}
