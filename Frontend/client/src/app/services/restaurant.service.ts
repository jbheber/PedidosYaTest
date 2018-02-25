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
export class RestaurantService extends BaseService {

  private _restaurantsUrl: string = AppConfig.ApiEndpoints.searchRestaurant;

  constructor(
    protected _http: Http,
    protected _cookieService: CookieService) {
    super(_http, _cookieService);
  }

  //Object to send to server for search purposes
  private payload = {
    countryId: 1,
    latitude: undefined,
    longitude: undefined,
    max: 20,
    offset: 0,
    fields: "name,ratingScore,deliveryTimeMaxMinutes,deliveryTimeMinMinutes,allCategories,opened,link,logo,rating,coordinates,topCategories"
  };

  public searchRestaurants(lat: number, lng: number): Observable<Restaurant[]> {
    return new Observable<Restaurant[]>(subscriber => {

      let inMemoryRestaurants = this.checkCoordinates(lat, lng);
      if (inMemoryRestaurants !== null)
        subscriber.next(inMemoryRestaurants);
      else
        this.fetchRestaurantsFromServer(lat, lng, subscriber);
    });

  }

  /**
   * Checks if the coordinates where searched before within the specified period of time
   * @param lat Latitude
   * @param lng Longitude
   */
  private checkCoordinates(lat: number, lng: number): Restaurant[] {
    let coordinates: string = lat.toString() + "," + lng.toString();
    let searchResult = SessionInfo.searches[coordinates];

    if (searchResult === undefined) return null;

    let withinTime = searchResult.realizationDate.add(AppConfig.SearchTimerMinutes, 'minutes') > moment();
    return withinTime ? searchResult.searchresult : null;
  }

  /**
   * API call to server to performe the search
   * @param lat Latitude
   * @param lng Longitude
   * @param subscriber Subscriber
   */
  private fetchRestaurantsFromServer(lat: number, lng: number, subscriber: Subscriber<Restaurant[]>) {
    let body = this.payload;
    body.latitude = lat;
    body.longitude = lng;
    this.doPost<any>(this._restaurantsUrl, body, true)
      .subscribe(
        (response: any) => {
          let restaurants = response.data as Restaurant[];
          SessionInfo.restaurants = restaurants;
          let coordinates: string = lat.toString() + "," + lng.toString();
          SessionInfo.searches[coordinates] = {
            searchresult: restaurants,
            realizationDate: moment()
          };
          subscriber.next(restaurants);
        },
        error => {
          console.log(error);
        }
      );
  }
}
