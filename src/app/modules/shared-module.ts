import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectiveModule } from './directives/directive.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [CommonModule],
  exports: [FlexLayoutModule, MaterialModule, DirectiveModule],
  declarations: []
})
export class SharedModule {}
