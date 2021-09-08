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

  constructor(private service: UserService, private alert: AlertService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('key');
    this.keyword = new FormControl(key || '', Validators.required);
    if (key) {
      this.search();
    }
  }

  search(): void {
    this.loading = true;
    this.user = null;
    this.service.find(this.keyword.value).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        if (res.data) {
          this.user = new UserInfo(res.data);
        } else {
          this.alert.error('error.search');
        }
      } else {
        if (res.code === 400) {
          this.alert.error('error.search');
        } else {
          this.alert.error();
        }
      }
    });
  }
}
