import { Component, OnInit } from '@angular/core';
import { USER_CREATE, SEARCH, IPage, USER_PENDING } from 'src/app/core/page-config';
import { RouterService } from 'src/app/services/router.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  links: any[];

  constructor(private router: RouterService, private sidenav: SidenavService) {}

  ngOnInit(): void {
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
        name: 'menu.user.pending',
        page: USER_PENDING,
        icon: 'progress-question'
      }
    ];
  }

  go(page: IPage): void {
    this.router.go(page);
    this.sidenav.left.close();
  }
}
