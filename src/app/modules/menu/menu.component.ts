import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { IPage, SEARCH, USER_LIST, USER_PROFILE } from 'src/app/core/page-config';
import { DestroyService } from 'src/app/services/destroy.service';
import { RouterService } from 'src/app/services/router.service';
import { StoreService } from 'src/app/services/store.service';
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

  constructor(
    private router: RouterService,
    private store: StoreService,
    private readonly $destroy: DestroyService,
    private coreRouter: Router,
    private route: ActivatedRoute
  ) {
    this.store
      .selectUser()
      .pipe(takeUntil(this.$destroy))
      .subscribe((val: User) => (this.user = val));
    this.pages = [USER_LIST_MENU, SEARCH_PAGE_MENU, USER_PROFILE_MENU];
    this.coreRouter.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }

          return child?.snapshot.data.page;
        })
      )
      .subscribe((data: IPage) => {
        this.activePage = data;
      });
  }

  ngOnInit(): void {}

  go(page: IPage): void {
    this.activePage = page;
    this.router.go(page);
  }
}
