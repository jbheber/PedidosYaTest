import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { BaseService } from '../common/baseService';
import { LoginModel } from '../common/classes/login-model';
import { ToasterService } from 'angular2-toaster';
import { CookieService } from 'ngx-cookie';
import { SessionInfo } from '../common/session-info';

import { AppConfig } from '../common/appConfig';
import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service";

@Injectable()
export class AccountService extends BaseService {


  private _loginUrl: string = AppConfig.ApiEndpoints.Login;
  private _logoutUrl: string = AppConfig.ApiEndpoints.Logout;
  private _checkTokenUrl: string = AppConfig.ApiEndpoints.checkTokenUrl;

  constructor(
    protected _http: Http,
    protected _toasterService: ToasterService,
    protected _cookieService: CookieService,
    protected _userService: UserService) {
    super(_http, _cookieService);
  }

  /**
   * Authenticates user
   * @param user User to authenticate
   */
  public login(user: LoginModel): Observable<LoginModel> {
    return new Observable<LoginModel>(subscriber => {
      this.doPost(this._loginUrl, user.toJson())
        .subscribe(
          (response: any) => {
            let res = new LoginModel();
            res.username = user.username;
            res.token = response.token;
            subscriber.next(res);
          },
          error => {
            subscriber.error(error);
          }
        );
    });
  };

  /** 
   * Validates if current token is still active
  */
  public validateToken(): Observable<LoginModel> {
    return new Observable<LoginModel>(subscriber => {
      this.doGet<any>(this._checkTokenUrl, false)
        .subscribe(
          (response: any) => {
            //get user account
            this._userService.getUserAccount()
              .subscribe(user => {
                SessionInfo.userInfo = user;
                let res = new LoginModel();
                res.username = user.name + ' ' + user.lastName;
                subscriber.next(res);
              });
          },
          error => {
            subscriber.next(null);
          }
        );
    });
  };

  /**
   * Assign credentials to current session
   * @param credentials 
   */
  public setSessionCredentials(credentials: LoginModel) {
    if (credentials) {
      SessionInfo.currentUser = credentials.username;
    }
  };

  /** 
   * Terminates curren session
  */
  public logout(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.doGet(this._logoutUrl, false)
        .subscribe(
          (response: any) => {
            if (response.status == 200) {
              subscriber.next(true);
            } else {
              subscriber.next(false);
            }
          },
          (error: any) => {
            console.log(error);
            subscriber.next(false);
          });
    });
  };

};
