import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSidenav]'
})
export class SidenavDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
