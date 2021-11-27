import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { UserFormModule } from '../user-form/user-form.module';
import { UserCreateRoutingModule } from './user-create-routing.module';
import { UserCreateComponent } from './user-create.component';

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
