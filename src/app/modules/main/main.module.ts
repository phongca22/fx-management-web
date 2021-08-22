import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { MenuModule } from '../menu/menu.module';
import { SharedModule } from '../shared-module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
imports: [CommonModule, MainRoutingModule, SharedModule, HeaderModule, MenuModule]
})
export class MainModule {}
