import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { USER_MANAGEMENT } from 'src/app/core/page-config';
import { Role } from 'src/app/core/role';
import { ConfigService } from 'src/app/services/config.service';
import { DestroyService } from 'src/app/services/destroy.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { RouterService } from 'src/app/services/router.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { DoctorManagementComponent } from '../doctor-management/doctor-management.component';
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
    private dialog: MatDialog,
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

  goUserManagement(): void {
    this.router.go(USER_MANAGEMENT);
  }

  goDoctorManagement(): void {
    this.dialog.open(DoctorManagementComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      autoFocus: false,
      panelClass: 'mat-dialog-no-padding'
    });
  }

  goAgentManagement(): void {
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
