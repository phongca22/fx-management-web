import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { find, isEqual } from 'lodash';
import { General } from 'src/app/core/general';
import { Role } from 'src/app/core/role';
import { DestroyService } from 'src/app/services/destroy.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../auth/auth.service';

export const ALL_FILTER: General = {
  id: 1,
  name: 'userFilter.all'
};

export const BY_PENDING_FILTER: General = {
  id: 2,
  name: 'userFilter.pending'
};

export const BY_MINE_FILTER: General = {
  id: 3,
  name: 'userFilter.mine'
};

export const BY_EMERGENCY: General = {
  id: 5,
  name: 'userFilter.emergency'
};

export const TODAY_FILTER: General = {
  id: 6,
  name: 'userFilter.today'
};

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
  providers: [DestroyService]
})
export class UserFilterComponent implements OnInit {
  @Input() hasEmergency: boolean;
  @Output() change: EventEmitter<Function>;
  filters: General[];
  isDoctor: boolean;
  isAgent: boolean;
  isTransporter: boolean;

  constructor(private auth: AuthService, private user: UserService, private socket: SocketService) {
    this.change = new EventEmitter();
    this.isDoctor = this.auth.hasRole(Role.Doctor);
    this.isAgent = this.auth.hasRole(Role.Agent);
    this.isTransporter = this.auth.hasRole(Role.Volunteer);
    if (this.isDoctor) {
      this.filters = [ALL_FILTER, TODAY_FILTER, BY_MINE_FILTER];
    } else if (this.isAgent) {
      this.filters = [ALL_FILTER, TODAY_FILTER, BY_MINE_FILTER, BY_PENDING_FILTER, BY_EMERGENCY];
    } else if (this.isTransporter) {
      this.filters = [ALL_FILTER, TODAY_FILTER, BY_MINE_FILTER];
    } else {
      this.filters = [ALL_FILTER, TODAY_FILTER];
    }
  }

  ngOnInit(): void {
    if (this.hasEmergency) {
      const t = find(this.filters, BY_EMERGENCY);
      if (t) {
        this.select(t);
      }
      this.socket.emergencyMessage.next(false);
    } else {
      const t = find(this.filters, BY_MINE_FILTER);
      if (t) {
        this.select(t);
      }
    }
  }

  select(data: General) {
    if (isEqual(data, BY_PENDING_FILTER)) {
      this.change.next((page: number) => this.user.getByPendingSupport(page));
    } else if (isEqual(data, BY_MINE_FILTER)) {
      if (this.isDoctor) {
        this.change.next((page: number) => this.user.getByDoctor(page));
      } else if (this.isAgent) {
        this.change.next((page: number) => this.user.getByAgent(page));
      } else if (this.isTransporter) {
        this.change.next((page: number) => this.user.getByTransporter(page));
      }
    } else if (isEqual(data, BY_EMERGENCY)) {
      this.change.next((page: number) => this.user.getByEmergency(page));
    } else if (isEqual(data, TODAY_FILTER)) {
      this.change.next((page: number) => this.user.getByToday(page));
    } else {
      this.change.next((page: number) => this.user.getAllUsers(page));
    }
  }
}
