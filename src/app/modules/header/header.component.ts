import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private router: RouterService, private sidenav: SidenavService) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth.logout();
    this.router.login();
  }

  showMenu(): void {
    this.sidenav.left.open();
  }
}
