import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from "../../common/baseComponent";
import { SessionInfo } from '../../common/session-info';
import { AccountService } from '../../services/account.service';
import { LoginModel } from '../../common/classes/login-model';
import { ToasterService } from 'angular2-toaster';
import { CookieService } from 'ngx-cookie';
import { AppConfig } from '../../common/appConfig';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  private _model : LoginModel;

  constructor(
    protected _accountService: AccountService,
    protected _router: Router,
    protected _toasterService: ToasterService,
    protected _cookieService: CookieService) {
    super();
    this.removeCookie();
    this.model = new LoginModel();
  }

  ngOnInit() {
  }

  public tryLogin(): void {
    let user = this.model
    this._accountService.login(user).subscribe(result => {
      this.addCookie(result.token);
      this.setCredentials(result);
    },
      error => {
        this._toasterService.pop('error', this.translate("toaster.login.title"),
          this.translate("toaster.login.error"));
      });
  };

  private addCookie(cValue: string) {
    this._cookieService.put(this._cookieName, cValue);
  };

  private removeCookie() {
    this._cookieService.remove(this._cookieName);
  };

  private setCredentials(credentials: LoginModel) {
    if (credentials) {
      this._accountService.setSessionCredentials(credentials);
      this._router.navigateByUrl(AppConfig.WebRoutes.Dashboard);
      this._toasterService.pop('success', this.translate("toaster.login.title"),
        this.translate("toaster.login.success").replace('{0}', credentials.username));
    }
  };

  public get model() : LoginModel {
    return this._model;
  }
  public set model(v : LoginModel) {
    this._model = v;
  }
  

}
