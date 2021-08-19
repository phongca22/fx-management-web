import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { pageReducer } from './page/page.reducer';
import { userReducer } from './user/user.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      user: userReducer,
      page: pageReducer
    })
  ]
})
export class AppStoreModule {}
