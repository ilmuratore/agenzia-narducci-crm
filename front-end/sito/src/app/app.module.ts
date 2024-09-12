// componenti che vengono importati e dichiarati
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// componenti che vengono importati e dichiarati ( pages etc.. )
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { PolicyComponent } from './components/pages/policy/policy.component';
import { ClientsComponent } from './components/pages/clients/clients.component';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';
import { CalendarComponent } from './components/pages/calendar/calendar.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { LoginComponent } from './components/pages/login/login.component';

// dichiarazione dei service di gestione delle chiamate https
import { LoginService } from './services/login.service';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    PolicyComponent,
    ClientsComponent,
    InvoiceComponent,
    CalendarComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    LoginService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
