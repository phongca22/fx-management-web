import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared-module';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({}), PipeModule],
  exports: [MenuComponent]
})
export class MenuModule {}
