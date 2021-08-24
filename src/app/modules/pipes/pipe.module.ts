import { NgModule } from '@angular/core';
import { GenderPipe } from './gender.pipe';
import { userConditionPipe } from './user-condition.pipe';
import { SupportStatusPipe } from './support-status.pipe';

@NgModule({
  declarations: [GenderPipe, userConditionPipe, SupportStatusPipe],
  exports: [GenderPipe, userConditionPipe, SupportStatusPipe]
})
export class PipeModule {}
