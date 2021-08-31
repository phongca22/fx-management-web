import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { IPage, SEARCH, USER_CREATE, USER_LIST } from 'src/app/core/page-config';
import { Role } from 'src/app/core/role';
import { DestroyService } from 'src/app/services/destroy.service';
import { RouterService } from 'src/app/services/router.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../store/user/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [DestroyService]
})
export class MenuComponent implements OnInit {
  links: any[];
  user: User | null;

  constructor(
    private router: RouterService,
    private sidenav: SidenavService,
    private store: StoreService,
    private readonly $destroy: DestroyService,
    private auth: AuthService
  ) {
    this.store
      .selectUser()
      .pipe(takeUntil(this.$destroy))
      .subscribe((val: User) => (this.user = val));
  }

  ngOnInit(): void {
    if (this.auth.hasRole(Role.Doctor)) {
      this.links = [
        {
          name: 'menu.user.search',
          page: SEARCH,
          icon: 'account-search'
        },
        {
          name: 'menu.user.list',
          page: USER_LIST,
          icon: 'clipboard-account-outline'
        }
      ];
    } else if (this.auth.hasRole(Role.Coordinator)) {
      this.links = [
        {
          name: 'menu.user.create',
          page: USER_CREATE,
          icon: 'account-plus'
        },
        {
          name: 'menu.user.search',
          page: SEARCH,
          icon: 'account-search'
        },
        {
          name: 'menu.user.list',
          page: USER_LIST,
          icon: 'clipboard-account-outline'
        }
      ];
    } else if (this.auth.hasRole(Role.Volunteer)) {
      this.links = [
        {
          name: 'menu.user.search',
          page: SEARCH,
          icon: 'account-search'
        },
        {
          name: 'menu.user.list',
          page: USER_LIST,
          icon: 'clipboard-account-outline'
        }
      ];
    } else {
      this.links = [];
    }
  }

  go(page: IPage): void {
    this.router.go(page);
    this.sidenav.left.close();
  }

  logout(): void {
    this.auth.logout();
    this.router.login();
  }
}
