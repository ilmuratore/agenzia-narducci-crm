import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/pages/calendar/calendar.component';
import { ClientsComponent } from './components/pages/clients/clients.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PolicyComponent } from './components/pages/policy/policy.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

// import della guard di autenticazione per proteggere le rotte
import {AuthGuard} from './services/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] },
  { path: 'policy', component: PolicyComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
