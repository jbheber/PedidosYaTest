export const listeningPort = 5000;

// Pedidos Ya API configuration
export const cloudUrl: string = "http://stg-api.pedidosya.com/public/v1/";
export const clientId: string = "xxxxxxxx";
export const clientSecret: string = "xxxxxxxx";

//Passport jwt configuration
export const secret: string = "12TestPedidoYa34!"
export const TokenTimeToLive = 10080; // in seconds

//mongodb configuration
export const DatabaseUrl = 'mongodb://localhost:27017/pedidosYa';

/** 
 * Object that contains all the PediosYaAPI endpoints
*/
export const apiUrls = {
    getAccessToken: `${cloudUrl}tokens?clientId=${clientId}&clientSecret=${clientSecret}`,
    getUserLogin: `${cloudUrl}tokens?userName={0}&password={1}`,
    getUserAccount: `${cloudUrl}myAccount`,
    getSearchRestaurants: `${cloudUrl}search/restaurants?country={0}&point={lat},{log}`
};

/** 
 * Stores the access token for PedidosYaAPI
*/
export class authToken{
    private static _access_token : string;
    public static get access_token() : string {
        return this._access_token;
    }
    public static set access_token(v : string) {
        this._access_token = v;
    }
}
