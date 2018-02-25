import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export abstract class BaseService {
    protected _cookieName: string = "pyttoken";

    constructor(
        protected _http: Http,
        protected _cookieService: CookieService) { };

    protected extractData<T>(res: any): T {
        let body = <T>res.json();
        return body || <T>{};
    };

    protected handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    };

    /**
     * Http POST request
     * @param {string} url Url address of the endpoint
     * @param {boolean} handleData True to only get the json, False to get the whole response.
     * Default true.
     */
    protected doPost<T>(url: string, body: any, handleData: boolean = true): Observable<T> {
        let token = this._cookieService.get(this._cookieName);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({ headers: headers });
        let jsonBody = JSON.parse(JSON.stringify(body));

        let request: Observable<T> = this._http.post(url, body, options)
            .catch(this.handleError);

        if (handleData)
            request = request.map<T, T>(this.extractData);

        return request;
    };

    /**
     * Http PUT request
     * @param {string} url Url address of the endpoint
     * @param {boolean} handleData True to only get the json, False to get the whole response.
     * Default true.
     */
    protected doPut<T>(url: string, body: any, handleData: boolean = true): Observable<T> {
        let token = this._cookieService.get(this._cookieName);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({ headers: headers });
        let jsonBody = JSON.parse(JSON.stringify(body));

        let request: Observable<T> = this._http.put(url, body, options)
            .catch(this.handleError);

        if (handleData) {
            request = request.map<T, T>(this.extractData);
        }

        return request;
    };

    /**
     * Http PATCH request
     * @param {string} url Url address of the endpoint
     * @param {boolean} handleData True to only get the json, False to get the whole response.
     * Default true.
     */
    protected doPatch<T>(url: string, body: any, handleData: boolean = true): Observable<T> {
        let token = this._cookieService.get(this._cookieName);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({ headers: headers });

        let request: Observable<T> = this._http.patch(url, body, options)
            .catch(this.handleError);

        if (handleData)
            request = request.map<T, T>(this.extractData);

        return request;
    };

    /**
     * Http GET request
     * @param {string} url Url address of the endpoint
     * @param {boolean} handleData True to only get the json, False to get the whole response.
     * Default true.
     */
    protected doGet<T>(url: string, handleData: boolean = true): Observable<T> {
        let token = this._cookieService.get(this._cookieName);
        let headers = new Headers({
            'Authorization': token
        });
        let options = new RequestOptions({ headers: headers });
        let request: Observable<T> = this._http.get(url, options)
            .catch(this.handleError);

        if (handleData)
            request = request.map<T, T>(this.extractData);

        return request;
    }

    /**
     * Http DELETE request
     * @param {string} url Url address of the endpoint
     * @param {boolean} handleData True to only get the json, False to get the whole response.
     * Default true.
     */
    protected doDelete<T>(url: string, handleData: boolean = true): Observable<T> {
        let token = this._cookieService.get(this._cookieName);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({ headers: headers });
        let request: Observable<T> = this._http.delete(url, options)
            .catch(this.handleError);

        if (handleData)
            request = request.map<T, T>(this.extractData);

        return request;
    }
}