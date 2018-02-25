import { EventEmitter } from "@angular/core";
import { User } from "./classes/user-model";
import { Restaurant } from "./classes/restaurant";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class SessionInfo {
    public static onUserLoaded: EventEmitter<any> = new EventEmitter<any>();

    private static _currentUser: string;
    private static _userInfo: User = new User();
    private static _restaurants: Subject<Restaurant[]> = new BehaviorSubject<Restaurant[]>([]);

    /**
     * Dictionary of key: coordinates - value: { searchresult, realizationDate }
     */
    public static searches = {};

    public static get currentUser(): string {
        return this._currentUser;
    };

    public static set currentUser(v: string) {
        this._currentUser = v;
        this._userInfo.username = v;
        this.onUserLoaded.emit(v);
    };

    public static get userInfo(): User {
        return this._userInfo;
    };

    public static set userInfo(v: User) {
        this._userInfo = v;
    };

    /**
     * Set new restaurants to the observable restaurant array
     */
    public static set restaurants(v: Restaurant[]) {
        let restaurantsArray = v.filter(r => r.opened == 1)
            .sort((r1, r2) => r2.ratingScore - r1.ratingScore);
        SessionInfo._restaurants.next(restaurantsArray);
    }

    /**
     * Observable array that notifies changes
     */
    public static get restaurantsArray(): Observable<Restaurant[]> {
        return SessionInfo._restaurants.asObservable();
    }
    
}
