import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from "../common/baseComponent";
import { AppConfig } from "../common/appConfig";
import { AccountService } from '../services/account.service';
import { LoginModel } from '../common/classes/login-model';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
/**
 * Component that manages the base route. If the route has no direction (.../) then the default component
 * redirects to Login or Dashboard (which means a user is logged in) page depending if there is a token stored in the cookies.
 */
export class DefaultComponent extends BaseComponent {

  constructor(
    protected _accountService: AccountService,
    protected _router: Router,
    protected _cookieService: CookieService) {
    super();
  }

  ngOnInit() {
    this.checkCookie();
  }

  private checkCookie() {
    if (this._cookieService.get(this._cookieName)) {
      this._accountService.validateToken().subscribe(result => {
        this.setCredentials(result);
      });
    } else {
      this._router.navigateByUrl(this._webRoutes.Login);
    }
  };

  private setCredentials(credentials: LoginModel) {
    if (credentials) {
      this._accountService.setSessionCredentials(credentials);

      this._router.navigate([this._webRoutes.Dashboard], 
        { queryParams: { lat: AppConfig.MapProperties.latitude, lng: AppConfig.MapProperties.longitude } });
    } else
      this._router.navigateByUrl(this._webRoutes.Login);
  };

};
