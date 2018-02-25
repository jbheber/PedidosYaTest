import { BaseComponent } from '../baseComponent';
import { SessionInfo } from '../session-info';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AccountService } from '../../services/account.service';
export class PrivateBasePage extends BaseComponent {

    constructor(protected _router: Router,
        protected _cookieService: CookieService,
        protected _accountService: AccountService) {
        super();
        if (!SessionInfo.currentUser) {
            if (this._cookieService.get(this._cookieName)) {
                this._accountService.validateToken().subscribe(credentials => {
                    if (credentials) {
                        this._accountService.setSessionCredentials(credentials);
                    } else
                        this.navigateByUrl(this._webRoutes.Default);
                });
            } else
                this.navigateByUrl(this._webRoutes.Default);
        }
    }

    navigateByUrl(url: string) {
        this._router.navigateByUrl(url);
    };
}
