import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AccountService } from './services/account.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { NgxNLoggerModule } from 'ngx-n-logger';
import { TokenInterceptor } from './auth/token.interceptor';
import { UserService } from './services';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxNLoggerModule.forRoot({
      enableInterceptorLogging: true,
    }),
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AccountService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
