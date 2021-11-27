import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav.service';
import { StoreService } from 'src/app/services/store.service';
import { PageState } from '../store/page/page-state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  // @ViewChild('rightSidenav') public rightSidenav: MatSidenav;
  // @ViewChild('leftSidenav') public leftSidenav: MatSidenav;
  // @ViewChild(SidenavDirective, { static: true }) public sidenavDirective: SidenavDirective;
  hideMenu: boolean;
  private route: ActivatedRoute;

  constructor(private sidenavService: SidenavService, private store: StoreService) {
    this.store.selectPage().subscribe((page: PageState) => (this.hideMenu = page.state?.hideMenu));
  }

  ngOnInit() {
    // this.sidenavService.setViewContainer(this.sidenavDirective.viewContainerRef);
  }

  ngAfterViewInit() {
    // this.sidenavService.setPanel(this.leftSidenav, this.rightSidenav);
  }
}
