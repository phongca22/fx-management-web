import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { IPage, SEARCH, USER_LIST, USER_PROFILE } from 'src/app/core/page-config';
import { DestroyService } from 'src/app/services/destroy.service';
import { RouterService } from 'src/app/services/router.service';
import { StoreService } from 'src/app/services/store.service';
import { PageState } from '../store/page/page-state';
import { User } from '../store/user/user';

const SEARCH_PAGE_MENU = {
  name: 'menu.user.search',
  page: SEARCH,
  icon: 'account-search-outline',
  activeIcon: 'account-search'
};

const USER_LIST_MENU = {
  name: 'menu.user.list',
  page: USER_LIST,
  icon: 'account-multiple-outline',
  activeIcon: 'account-multiple'
};

const USER_PROFILE_MENU = {
  name: 'menu.user.profile',
  page: USER_PROFILE,
  icon: 'account-outline',
  activeIcon: 'account'
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [DestroyService]
})
export class MenuComponent implements OnInit {
  pages: any[];
  user: User | null;
  activePage: any;

  constructor(private router: RouterService, private store: StoreService, private readonly $destroy: DestroyService) {
    this.store
      .selectUser()
      .pipe(takeUntil(this.$destroy))
      .subscribe((val: User) => (this.user = val));
    this.pages = [USER_LIST_MENU, SEARCH_PAGE_MENU, USER_PROFILE_MENU];

    this.store
      .selectPage()
      .pipe(takeUntil(this.$destroy))
      .subscribe((page: PageState) => {
        this.activePage = page.page;
      });
  }

  ngOnInit(): void {}

  go(page: IPage): void {
    this.activePage = page;
    this.router.go(page);
  }
}
