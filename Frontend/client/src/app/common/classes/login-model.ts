export class LoginModel {
    private _username : string;
    private _password : string;
    private _token : string;

    constructor() { };

    
    public get username() : string {
        return this._username;
    }
    public set username(v : string) {
        this._username = v;
    }
    
    public get password() : string {
        return this._password;
    }
    public set password(v : string) {
        this._password = v;
    }
    
    public get token() : string {
        return this._token;
    }
    public set token(v : string) {
        this._token = v;
    }

    /**
     * Converts Login Model to json format
     */
    public toJson(): any {
        return {
            username: this.username,
            password: this.password
        };
    };
    
};