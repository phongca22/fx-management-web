import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DoctorManagementModule } from '../doctor-management/doctor-management.module';
import { SharedModule } from '../shared-module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, TranslateModule.forChild({}), DoctorManagementModule]
})
export class ProfileModule {}
