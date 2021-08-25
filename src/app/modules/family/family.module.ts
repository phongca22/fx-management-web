import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { MemberAddComponent } from './member-add/member-add.component';

@NgModule({
  declarations: [MemberAddComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({}), ReactiveFormsModule],
  exports: [MemberAddComponent]
})
export class FamilyModule {}
