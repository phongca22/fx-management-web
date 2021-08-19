import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fx-management-web';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('vi');
    this.translate.use('vi');
  }
}
