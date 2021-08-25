import { NgModule } from '@angular/core';
import { GenderPipe } from './gender.pipe';
import { userConditionPipe } from './user-condition.pipe';
import { SupportStatusPipe } from './support-status.pipe';
import { AgePipe } from './age.pipe';
import { RolePipe } from './role.pipe';

@NgModule({
  declarations: [GenderPipe, userConditionPipe, SupportStatusPipe, AgePipe, RolePipe],
  exports: [GenderPipe, userConditionPipe, SupportStatusPipe, AgePipe, RolePipe]
})
export class PipeModule {}
