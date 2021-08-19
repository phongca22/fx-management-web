import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageState } from '../modules/store/page/page-state';
import { change } from '../modules/store/page/page.actions';
import { User } from '../modules/store/user/user';
import { reset, set } from '../modules/store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private service: Store<any>) {}

  selectUser() {
    return this.service.select('user');
  }

  selectPage() {
    return this.service.select('page');
  }

  resetUser() {
    this.service.dispatch(reset());
  }

  setUser(data: User) {
    this.service.dispatch(set(data));
  }

  changePage(data: PageState) {
    this.service.dispatch(change(data));
  }
}
