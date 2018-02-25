import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie';

import { AppConfig } from '../common/appConfig';
import { BaseService } from '../common/baseService';
import { SessionInfo } from '../common/session-info';
import { Restaurant } from '../common/classes/restaurant';
import * as moment from 'moment';
import { Subscriber } from 'rxjs';

@Injectable()
export class ReportsService extends BaseService  {

  private _searchReportUrl: string = AppConfig.ApiEndpoints.searchReport;

  constructor(
    protected _http: Http,
    protected _cookieService: CookieService) {
    super(_http, _cookieService);
  }

  /** 
   * Fetch previous searches from server
  */
  public getSearchesReport(): Observable<any> {
    return new Observable<any>(subscriber => {
      this.doGet<any>(this._searchReportUrl)
      .subscribe(
        (response: any) => {
          subscriber.next(response);
        },
        error => {
          console.log(error);
        }
      );
    });

  }

}
