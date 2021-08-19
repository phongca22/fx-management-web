import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { Subject } from 'rxjs';
import { Page, StackedPage } from '../core/page';
import { LOGIN, USER_PROFILE } from '../core/page-config';
import { PageState } from '../modules/store/page/page-state';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  landingPage: Page;
  stackedPages: StackedPage[] = [];
  stackedPages$: Subject<StackedPage[]>;
  navigationExtras: NavigationExtras | undefined;
  isPermissionError: boolean;
  isRefreshing: boolean;
  currentPage: PageState;
  previousPage: PageState;

  constructor(private router: Router, private store: StoreService) {
    this.stackedPages$ = new Subject();
    this.store.selectPage().subscribe((page: PageState) => (this.currentPage = page));
  }

  setLandingPage(data: Page) {
    this.landingPage = data;
  }

  setStackedPage(page: StackedPage) {
    this.stackedPages.push(page);
    this.stackedPages$.next(this.stackedPages);
  }

  getStackedPageChange() {
    return this.stackedPages$;
  }

  go(page: Page, extras?: NavigationExtras): void {
    this.navigationExtras = extras;
    this.router.navigate([page.url], extras);
  }

  login(): void {
    this.go(LOGIN);
  }

  goHome(): void {
    this.go(USER_PROFILE);
  }

  exitStackedPage() {
    const last: StackedPage = this.stackedPages.pop() as StackedPage;
    this.go(last.page, { state: { data: last.data } });
    this.stackedPages$.next(this.stackedPages);
  }

  resetStackedPage() {
    this.stackedPages = [];
    this.stackedPages$.next([]);
  }
}
