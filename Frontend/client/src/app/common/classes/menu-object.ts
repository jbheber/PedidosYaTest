export class MenuObject {
    private _title : string;
    private _displayName : string;
    private _routerLink : string;
    private _icon : string;

    /**
     * Ctor
     * @param title 
     * @param displayName 
     * @param routerLink 
     * @param icon 
     */
    constructor(title: string, displayName: string, routerLink: string, icon: string){
        this.title = title;
        this.displayName = displayName;
        this.routerLink = routerLink;
        this.icon = icon;
    }
    
    public get title() : string {
        return this._title;
    }
    public set title(v : string) {
        this._title = v;
    }
    
    public get displayName() : string {
        return this._displayName;
    }
    public set displayName(v : string) {
        this._displayName = v;
    }
    
    public get routerLink() : string {
        return this._routerLink;
    }
    public set routerLink(v : string) {
        this._routerLink = v;
    }
    
    public get icon() : string {
        return this._icon;
    }
    public set icon(v : string) {
        this._icon = v;
    }
};