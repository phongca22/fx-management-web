import { NgModule } from '@angular/core';
import { SidenavDirective } from './sidenav.directive';

@NgModule({
  declarations: [SidenavDirective],
  exports: [SidenavDirective]
})
export class DirectiveModule {}
