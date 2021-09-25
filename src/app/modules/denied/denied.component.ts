import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.scss']
})
export class DeniedComponent implements OnInit {
  constructor(private router: RouterService) {}

  ngOnInit(): void {}

  back() {
    this.router.login();
  }
}
