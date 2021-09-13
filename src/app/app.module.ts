import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from './modules/alert/alert.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './modules/config/config.module';
import { SharedModule } from './modules/shared-module';
import { AppStoreModule } from './modules/store/store.module';
import { EmptyComponent } from './empty/empty.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `/assets/i18n/`, `.json?version=${environment.version}`);
}

@NgModule({
  declarations: [AppComponent, EmptyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppStoreModule,
    SharedModule,
    HttpClientModule,
    AlertModule,
    AppConfigModule,
    AuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
