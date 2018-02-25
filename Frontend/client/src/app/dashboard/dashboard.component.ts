import { Component, OnInit } from '@angular/core';
import { PrivateBasePage } from '../common/classes/private-base-page';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie';
import { AccountService } from '../services/account.service';
import { RestaurantService } from '../services/restaurant.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { Marker } from '../common/classes/marker';
import { AppConfig } from '../common/appConfig';
import { ActivatedRoute } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { Restaurant } from '../common/classes/restaurant';
import { SessionInfo } from '../common/session-info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends PrivateBasePage implements OnInit {

  private _markers: Marker[];
  private _restaurants: Restaurant[];
  private _mapProperties = AppConfig.MapProperties;
  private _isActiveGeoLocation: boolean = false;
  private _userPosition: Marker = new Marker();

  constructor(
    protected _router: Router,
    protected _cookieService: CookieService,
    protected _accountService: AccountService,
    protected _toasterService: ToasterService,
    protected _restaurantService: RestaurantService,
    protected route: ActivatedRoute,
    protected _location: Location
  ) {
    super(_router, _cookieService, _accountService);
    this.markers = new Array<Marker>();
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params.lat && params.lng) {
        this._mapProperties.latitude = Number(params.lat);
        this._mapProperties.longitude = Number(params.lng);
      } 
      // check if browser has geolocation
      else if (window.navigator.geolocation) {
        //use geo location for centering map
        window.navigator.geolocation.getCurrentPosition((position) => {
          this._mapProperties.latitude = position.coords.latitude;
          this._mapProperties.longitude = position.coords.longitude;
          this.userPosition.latitude = position.coords.latitude;
          this.userPosition.longitude = position.coords.longitude;
          this.isActiveGeoLocation = true;
          this.searchRestaurants();
        });
      }
      //fetch restaurants
      this.searchRestaurants();
    });
    SessionInfo.restaurantsArray.subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }

  public get userPosition(): Marker {
    return this._userPosition;
  }
  public set userPosition(v: Marker) {
    this._userPosition = v;
  }

  public get isActiveGeoLocation(): boolean {
    return this._isActiveGeoLocation;
  }
  public set isActiveGeoLocation(v: boolean) {
    this._isActiveGeoLocation = v;
  }

  public get markers(): Marker[] {
    return this._markers;
  }
  public set markers(v: Marker[]) {
    this._markers = v;
  }

  public get restaurants(): Restaurant[] {
    return this._restaurants;
  }
  public set restaurants(v: Restaurant[]) {
    this._restaurants = v;
  }


  public get mapProperties() {
    return this._mapProperties;
  }

  public markerClicked(marker: Marker): void {
    this.mapProperties.latitude = marker.latitude;
    this.mapProperties.longitude = marker.longitude;
    this.mapProperties.zoom = 18;
  }

  public mapClicked($event: MouseEvent) {
    this.mapProperties.latitude = $event.coords.lat;
    this.mapProperties.longitude = $event.coords.lng;
    this.searchRestaurants();
  }

  public resetMap(event: any) {
    this.mapProperties.zoom = 15;
  }

  private searchRestaurants() {
    this._restaurantService.searchRestaurants(this._mapProperties.latitude, this._mapProperties.longitude)
      .subscribe(restaurants => {
        restaurants.forEach(r => {
          if (r.opened === 1) {
            let marker = new Marker();
            let lat = r.coordinates.split(",")[0];
            let long = r.coordinates.split(",")[1];
            marker.latitude = Number(lat);
            marker.longitude = Number(long);
            marker.title = r.name;
            marker.logo = r.logo;
            marker.link = r.link;
            //check that marker doesn't exist
            if (this.markers.indexOf(marker) === -1)
              this.markers.push(marker);
          }
        })
      }, err => {
        console.error(err.message);
      });
  }
}
