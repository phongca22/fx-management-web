import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCreateRoutingModule } from './user-create-routing.module';
import { UserCreateComponent } from './user-create.component';
import { SharedModule } from '../shared-module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormModule } from '../user-form/user-form.module';

@NgModule({
  declarations: [UserCreateComponent],
  imports: [
    CommonModule,
    UserCreateRoutingModule,
    SharedModule,
    TranslateModule.forChild({}),
    UserFormModule,
    ReactiveFormsModule
  ]
})
export class UserCreateModule {}
