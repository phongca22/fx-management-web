import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { from, Observable, of, Subject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { Page, StackedPage } from '../core/page';
import { BLANK, LOGIN, SEARCH, USER_LIST } from '../core/page-config';
import { PageState } from '../modules/store/page/page-state';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  stackedPages: StackedPage[] = [];
  stackedPages$: Subject<StackedPage[]>;
  navigationExtras: NavigationExtras | undefined;
  currentPage: PageState;
  previousPage: PageState;
  isRefreshing: boolean;

  constructor(private router: Router, private store: StoreService) {
    this.stackedPages$ = new Subject();
    this.store.selectPage().subscribe((page: PageState) => (this.currentPage = page));
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
    if (this.currentPage.page === page) {
      this.refreshCurrentPage().subscribe(() => this.go(page, extras));
    } else {
      this.router.navigate([page.url], extras);
    }
  }

  goSearch(data: string): void {
    this.router.navigate([SEARCH.url, data]);
  }

  login(): void {
    this.go(LOGIN);
  }

  goHome(): void {
    this.go(USER_LIST);
  }

  refreshCurrentPage(): Observable<any> {
    this.previousPage = this.currentPage;
    return of(true).pipe(
      tap(() => (this.isRefreshing = true)),
      concatMap(() => from(this.router.navigate([BLANK.url], { skipLocationChange: true })))
    );
  }
}
