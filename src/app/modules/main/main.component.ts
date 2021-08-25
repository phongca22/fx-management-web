import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';
import { SidenavDirective } from '../directives/sidenav.directive';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('rightSidenav') public rightSidenav: MatSidenav;
  @ViewChild('leftSidenav') public leftSidenav: MatSidenav;
  @ViewChild(SidenavDirective, { static: true }) public sidenavDirective: SidenavDirective;
  isPaymentPropSidenav: boolean;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.setViewContainer(this.sidenavDirective.viewContainerRef);
  }

  ngAfterViewInit() {
    this.sidenavService.setPanel(this.leftSidenav, this.rightSidenav);
}
}