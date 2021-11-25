import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keyword: FormControl;
  loading: boolean;
  user: UserInfo | null;
  isNotFound: boolean;
  init: boolean = true;

  constructor(private service: UserService, private alert: AlertService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('key');
    this.keyword = new FormControl(key || '');
    if (key) {
      this.search();
    }
  }

  search(): void {
    this.init = false;
    this.loading = true;
    this.user = null;
    this.isNotFound = false;
    this.service.find(this.keyword.value).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        if (res.data) {
          this.user = new UserInfo(res.data);
        } else {
          this.isNotFound = true;
        }
      } else {
        if (res.code === 400) {
          this.isNotFound = true;
        } else {
          this.alert.error();
        }
      }
    });
  }
}
