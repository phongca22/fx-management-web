import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export enum SidenavType {
  Menu = 1
}

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  left: MatSidenav;
  right: MatSidenav;
  viewContainerRef: ViewContainerRef;
  event: Subject<SidenavType>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.event = new Subject();
  }

  setPanel(left: MatSidenav, right: MatSidenav) {
    this.left = left;
    this.right = right;
    this.right.openedChange.pipe(filter((opened: boolean) => !opened)).subscribe(() => this.viewContainerRef.clear());
  }

  setViewContainer(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  toggle(type: SidenavType, data?: any) {
    this.event.next(type);
    if (SidenavType.Menu === type) {
      this.left.toggle();
    } else {
      this.loadComponent(type, data);
      this.right.toggle();
    }
  }

  loadComponent(type: SidenavType, data?: any) {
    // if (SidenavType.UserNote === type) {
    //   this.loadUserNoteComponent(data);
    // }
  }

  loadUserNoteComponent(data: any) {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserNoteComponent);
    // const componentRef = this.viewContainerRef.createComponent(componentFactory);
    // (<UserNoteComponent>componentRef.instance).data = data;
  }

  closeRight() {
    this.right.close();
  }
}
