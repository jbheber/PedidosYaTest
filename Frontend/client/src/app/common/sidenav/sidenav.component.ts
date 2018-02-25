import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { SessionInfo } from '../../common/session-info';
import { CookieService } from 'ngx-cookie';
import { MenuObject } from '../classes/menu-object';
import { BaseComponent } from "../../common/baseComponent";
import { AppConfig } from "../appConfig";

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent extends BaseComponent {
  public menuData: Array<MenuObject>;
  private menuBuilder = {};
  @Input() properties: any;

  constructor(
    protected _accountService: AccountService,
    protected _router: Router,
    protected _cookieService: CookieService) {
    super();
    this.menuData = new Array<MenuObject>();
    this.menuData.push(
      new MenuObject(
        this.translate("menu.dashboard.title"),
        this.translate("menu.dashboard.text"),
        this._webRoutes.Dashboard,
        "fa fa-tachometer")
    );
    this.menuData.push(
      new MenuObject(
        this.translate("menu.report.title"),
        this.translate("menu.report.text"),
        this._webRoutes.Reports,
        "fa fa-chart-line")
    );
  }

  ngOnInit() {
  };

  closeMenu() {
    this.properties.show = false;
  }

  logout() {
    SessionInfo.currentUser = undefined;
    this._cookieService.remove(this._cookieName);
    this._accountService.logout().subscribe(result => {
      this._router.navigateByUrl(this._webRoutes.Default);
    });
  };

  navigateTo(url) {
    this._router.navigateByUrl(url);
  };

}
