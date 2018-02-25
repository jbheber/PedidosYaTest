import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie';

import { AppConfig } from '../common/appConfig';
import { BaseService } from '../common/baseService';
import { User } from '../common/classes/user-model';

@Injectable()
export class UserService extends BaseService {
  private _userUrl: string = AppConfig.ApiEndpoints.userUrl;

  constructor(
    protected _http: Http,
    protected _cookieService: CookieService) {
    super(_http, _cookieService);
  }

  /**
   * Get current user info
   * @param {string} userId User identifier
   */
  public getUserAccount(): Observable<User> {
    return new Observable<User>(subscriber => {
      this.doGet<User>(this._userUrl, true)
        .subscribe(
          (response: User) => {
            subscriber.next(response);
          },
          error => {
            console.log(error);
          }
        );
    });
  };
};
