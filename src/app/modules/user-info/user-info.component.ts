import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { find } from 'lodash';
import { Doctor } from 'src/app/core/doctor';
import { UserInfo } from 'src/app/core/user-info';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {
  @Input() user: UserInfo | null;
  doctor: Doctor;

  constructor(private service: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.doctor = find(this.service.doctors, { id: this.user?.doctorId }) as Doctor;
  }

  ngOnInit(): void {}
}
