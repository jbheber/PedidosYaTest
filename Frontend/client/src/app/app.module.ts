import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { AgmCoreModule } from '@agm/core';
import { RatingModule } from "ngx-rating";

import { AppComponent } from './app.component';
import { PublicPageHeaderComponent } from './common/public-page-header/public-page-header.component';
import { PrivatePageHeaderComponent } from './common/private-page-header/private-page-header.component';
import { LoginComponent } from './account/login/login.component';
import { AccountService } from './services/account.service';
import { DefaultComponent } from './default/default.component';
import { AppConfig } from './common/appConfig';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './services/user.service';
import { RestaurantService } from './services/restaurant.service';
import { CardComponent } from './common/card/card.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsService } from './services/reports.service';

const appRoutes: Routes = [
  { path: AppConfig.WebRoutes.Default, component: DefaultComponent },
  { path: AppConfig.WebRoutes.Login, component: LoginComponent },
  { path: AppConfig.WebRoutes.Dashboard, component: DashboardComponent },
  { path: AppConfig.WebRoutes.Reports, component: ReportsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PublicPageHeaderComponent,
    PrivatePageHeaderComponent,
    DefaultComponent,
    SidenavComponent,
    DashboardComponent,
    CardComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    ToasterModule,
    CookieModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC4zR6G97uvPZBuWjoLGUbBVpXnG6mjA2w'
    }),
    RatingModule
  ],
  providers: [AccountService, UserService, RestaurantService, ReportsService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
