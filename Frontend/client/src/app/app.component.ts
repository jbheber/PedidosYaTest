import { Component } from '@angular/core';
import { BaseComponent } from './common/baseComponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
    title = 'Pedidos Ya';
    
    private _isUserLoggedIn : Boolean;
    
    private _sidebarProperties = {
        show: false
    };

    constructor() {
      super();
    }

    protected userLoaded(user: string){
        this.isUserLoggedIn = user !== undefined && user !== "";
    }

    public get isUserLoggedIn() : Boolean {
      return this._isUserLoggedIn;
    }
    public set isUserLoggedIn(v : Boolean) {
      this._isUserLoggedIn = v;
    }

    
    public get sidebarProperties() : any {
      return this._sidebarProperties;
    }
    public set sidebarProperties(v : any) {
      this._sidebarProperties = v;
    }
    
    
}
