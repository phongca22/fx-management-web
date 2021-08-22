import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({})],
  exports: [MenuComponent]
})
export class MenuModule {}
