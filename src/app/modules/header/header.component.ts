import { Component, OnInit } from '@angular/core';
import { SEARCH } from 'src/app/core/page-config';
import { RouterService } from 'src/app/services/router.service';
import { SidenavService, SidenavType } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: RouterService, private sidenav: SidenavService) {}

  ngOnInit(): void {}

  showMenu(): void {
    this.sidenav.toggle(SidenavType.Menu);
  }

  search(): void {
    this.router.go(SEARCH);
  }
}
