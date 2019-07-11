import { Store } from '@ngxs/store';
import { RuntimeService } from './services/runtime.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadFacilities, LoadEnergySystems } from './state/shared.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private runtimeService: RuntimeService,
    private store: Store) {

    translate.setDefaultLang('en');

    // Subscribe to language changed subject
    this.runtimeService.languageChanged$.subscribe(
      lang => {
        this.translate.use(lang);
      });
  }

  ngOnInit() {
    this.store.dispatch(new LoadFacilities());
    this.store.dispatch(new LoadEnergySystems());
  }
}
