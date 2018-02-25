import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../baseComponent';
import { SessionInfo } from '../session-info';


@Component({
  moduleId: module.id,
  selector: 'private-page-header',
  templateUrl: './private-page-header.component.html',
  styleUrls: ['./private-page-header.component.scss']
})
export class PrivatePageHeaderComponent extends BaseComponent {
  private _username : string;

  @Input() sidebarProperties: any;
  constructor() {
    super();
  }

  ngOnInit() {
    this._username = SessionInfo.currentUser;
  }

  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.sidebarProperties.show = !this.sidebarProperties.show;
  };
  
  public get username() : string {
    return this._username;
  }
  public set username(v : string) {
    this._username = v;
  }
  

};
