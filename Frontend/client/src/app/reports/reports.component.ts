import { Component, OnInit } from '@angular/core';
import { PrivateBasePage } from '../common/classes/private-base-page';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AccountService } from '../services/account.service';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent extends PrivateBasePage implements OnInit {
  private _reports : any[];

  constructor(
    protected _router: Router,
    protected _cookieService: CookieService,
    protected _accountService: AccountService,
    protected _reportService: ReportsService
  ) {
    super(_router, _cookieService, _accountService);
    this.reports = [];
  }

  ngOnInit() {
    this._reportService.getSearchesReport()
    .subscribe(rep =>{
      this.reports = rep;
    });
  }

  
  public get reports() : any[] {
    return this._reports;
  }
  public set reports(v : any[]) {
    this._reports = v;
  }
  
}
