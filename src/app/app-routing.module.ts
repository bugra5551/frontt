import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LoginComponent } from './components/login/login.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarListPublicComponent } from './components/car-list-public/car-list-public.component';
import { MakeReservationComponent } from './components/make-reservation/make-reservation.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { DataManagementComponent } from './components/data-management/data-management.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: CarListPublicComponent }, 
  { path: 'car-management', component: CarListComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Employee'] } },
  { path: 'data-management', component: DataManagementComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Employee'] } },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'carlist', component: CarListPublicComponent},
  { path: 'make-reservation/:carId', component: MakeReservationComponent, canActivate: [AuthGuard], data: { roles: ['Customer'] }  },
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard], data: { roles: ['Customer'] } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
