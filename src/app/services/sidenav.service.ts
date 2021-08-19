import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

export enum SidenavType {
  Menu = 1,
  PaymentProperties = 2,
  Notification = 3
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
    if (SidenavType.Notification === type) {
      this.loadNotificationComponent();
    } else {
      this.loadPaymentPropertiesComponent(data);
    }
  }

  loadPaymentPropertiesComponent(data: any) {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PaymentPropertiesComponent);
    // const componentRef = this.viewContainerRef.createComponent(componentFactory);
    // (<PaymentPropertiesComponent>componentRef.instance).data = data;
  }

  loadNotificationComponent() {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NotificationComponent);
    // this.viewContainerRef.createComponent(componentFactory);
  }

  closeRight() {
    this.right.close();
  }
}
