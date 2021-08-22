import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  constructor(private service: UserService, private alert: AlertService) {}

  ngOnInit(): void {
    this.keyword = new FormControl('', Validators.required);
  }

  search(): void {
    this.loading = true;
    this.user = null;
    this.service.findByCode(this.keyword.value).subscribe((res: Response) => {
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
