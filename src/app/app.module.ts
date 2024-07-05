import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CarListComponent } from './components/car-list/car-list.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { AdminComponent } from './components/admin/admin.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './services/auth/jwt.interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { CarListPublicComponent } from './components/car-list-public/car-list-public.component';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { MakeReservationComponent } from './components/make-reservation/make-reservation.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { DataManagementComponent } from './components/data-management/data-management.component';
import { RegisterComponent } from './components/register/register.component';

registerLocaleData(localeTr);

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    AdminComponent,
    UnauthorizedComponent,
    LoginComponent,
    MenuComponent,
    CarListPublicComponent,
    MakeReservationComponent,
    ReservationsComponent,
    DataManagementComponent,
    RegisterComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44338"], // API domain
        disallowedRoutes: ["https://localhost:44338/api/Auth/login"] // Login endpointi
      }
    })
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'tr-TR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
