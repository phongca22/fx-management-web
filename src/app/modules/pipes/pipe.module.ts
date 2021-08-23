import { NgModule } from '@angular/core';
import { GenderPipe } from './gender.pipe';
import { userConditionPipe } from './user-condition.pipe';

@NgModule({
  declarations: [GenderPipe, userConditionPipe],
  exports: [GenderPipe, userConditionPipe]
})
export class PipeModule {}
