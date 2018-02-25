export class Marker {
    private _latitude : number;
    private _longitude : number;
    private _title : string;
    private _logo : string;
    private _link : string;


    public get link() : string {
        return this._link;
    }
    public set link(v : string) {
        this._link = v;
    }
    
    public get logo() : string {
        return this._logo;
    }
    public set logo(v : string) {
        this._logo = v;
    }
    
    public get title() : string {
        return this._title;
    }
    public set title(v : string) {
        this._title = v;
    }
    
    public get longitude() : number {
        return this._longitude;
    }
    public set longitude(v : number) {
        this._longitude = v;
    }
    
    public get latitude() : number {
        return this._latitude;
    }
    public set latitude(v : number) {
        this._latitude = v;
    }
    
}