import { Component, OnInit } from '@angular/core';
import { DOCTOR_MANAGEMENT, USER_MANAGEMENT } from 'src/app/core/page-config';
import { Role } from 'src/app/core/role';
import { DestroyService } from 'src/app/services/destroy.service';
import { RouterService } from 'src/app/services/router.service';
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
  user: UserProfile | null;
  isAdmin: boolean;

  constructor(private service: ProfileService, private router: RouterService, private auth: AuthService) {
    this.isAdmin = this.auth.hasRole(Role.Admin);
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
    this.router.go(DOCTOR_MANAGEMENT);
  }
}
