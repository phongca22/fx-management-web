import { NavigationExtras } from '@angular/router';
import { Page } from 'src/app/core/page';

export interface PageState {
  page: Page | null;
  params?: NavigationExtras;
  data?: any;
  state?: any;
}
