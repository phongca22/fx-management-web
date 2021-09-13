import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isEqual } from 'lodash';
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

export const BY_DOCTOR_FILTER: General = {
  id: 3,
  name: 'userFilter.byDoctor'
};

export const BY_PENDING_FILTER: General = {
  id: 2,
  name: 'userFilter.byPending'
};

export const BY_TRANSPORTER_FILTER: General = {
  id: 4,
  name: 'userFilter.byTransporter'
};

export const BY_EMERGENCY: General = {
  id: 4,
  name: 'userFilter.byEmergency'
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

  constructor(private auth: AuthService, private user: UserService, private socket: SocketService) {
    this.change = new EventEmitter();
    if (this.auth.hasRole(Role.Doctor)) {
      this.filters = [ALL_FILTER, BY_DOCTOR_FILTER];
    } else if (this.auth.hasRole(Role.Coordinator)) {
      this.filters = [ALL_FILTER, BY_PENDING_FILTER, BY_EMERGENCY];
    } else if (this.auth.hasRole(Role.Volunteer)) {
      this.filters = [ALL_FILTER, BY_TRANSPORTER_FILTER];
    } else {
      this.filters = [ALL_FILTER, BY_PENDING_FILTER];
    }
  }

  ngOnInit(): void {
    if (this.hasEmergency) {
      this.select(this.filters[2]);
      this.socket.emergencyMessage.next(false);
    } else {
      this.select(this.filters[1]);
    }
  }

  select(data: General) {
    if (isEqual(data, BY_PENDING_FILTER)) {
      this.change.next((page: number) => this.user.getByPendingSupport(page));
    } else if (isEqual(data, BY_DOCTOR_FILTER)) {
      this.change.next((page: number) => this.user.getByDoctor(page));
    } else if (isEqual(data, BY_TRANSPORTER_FILTER)) {
      this.change.next((page: number) => this.user.getByTransporter(page));
    } else if (isEqual(data, BY_EMERGENCY)) {
      this.change.next((page: number) => this.user.getByEmergency(page));
    } else {
      this.change.next((page: number) => this.user.getAllUsers(page));
    }
  }
}
