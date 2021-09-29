import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { USER_MANAGEMENT } from 'src/app/core/page-config';
import { Role } from 'src/app/core/role';
import { DestroyService } from 'src/app/services/destroy.service';
import { RouterService } from 'src/app/services/router.service';
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
  user: UserProfile | null;
  isUserManagement: boolean;

  constructor(
    private service: ProfileService,
    private router: RouterService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {
    this.isUserManagement = this.auth.hasRole(Role.UserManagement);
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
}
