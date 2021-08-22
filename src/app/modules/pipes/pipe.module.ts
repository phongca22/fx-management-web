import { NgModule } from '@angular/core';
import { GenderPipe } from './gender.pipe';
import { UserStatusPipe } from './user-status.pipe';

@NgModule({
  declarations: [GenderPipe, UserStatusPipe],
  exports: [GenderPipe, UserStatusPipe]
})
export class PipeModule {}
