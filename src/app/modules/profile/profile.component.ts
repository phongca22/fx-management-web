import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AGENT_MANAGEMENT, DOCTOR_MANAGEMENT, USER_MANAGEMENT } from 'src/app/core/page-config';
import { Role } from 'src/app/core/role';
import { ConfigService } from 'src/app/services/config.service';
import { DestroyService } from 'src/app/services/destroy.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { RouterService } from 'src/app/services/router.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import { UserProfile } from './user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DestroyService]
})
export class ProfileComponent implements OnInit {
  user: UserProfile;
  isUserManagement: boolean;
  version: string;
  isDoctor: boolean;

  constructor(
    private service: ProfileService,
    private router: RouterService,
    private auth: AuthService,
    private alert: AlertService,
    private config: ConfigService,
    private doctor: DoctorService
  ) {
    this.isUserManagement = this.auth.hasRole(Role.UserManagement);
    this.isDoctor = this.auth.hasRole(Role.Doctor);
    this.version = this.config.version;
  }

  ngOnInit(): void {
    this.service.getProfile().subscribe((val: UserProfile) => (this.user = val));
  }

  logout(): void {
    this.service.logout().subscribe(() => this.router.login());
  }

  goDoctorManagement(): void {
    this.router.go(DOCTOR_MANAGEMENT, { state: { hideMenu: true } });
  }

  goAgentManagement(): void {
    this.router.go(AGENT_MANAGEMENT, { state: { hideMenu: true } });
  }

  goTransporterManagement(): void {
    this.alert.info('feature.developing');
  }

  setActive(event: MatSlideToggleChange) {
    this.user.workToday = event.checked;
    this.doctor.setActive(this.user.info.id, event.checked).subscribe((res: Response) => {
      if (!res.ok) {
        this.alert.error();
        this.user.workToday = !this.user.workToday;
      }
    });
  }
}
