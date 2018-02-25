import { AppConfig } from "./appConfig"
import { Resources } from './resources/resources';
import { SessionInfo } from './session-info';

export abstract class BaseComponent {
    protected _cookieName: string = "pyttoken";
    protected _webRoutes = AppConfig.WebRoutes;
    
    constructor() {
        if(SessionInfo.currentUser === undefined){
            SessionInfo.onUserLoaded.subscribe(this.userLoaded.bind(this));
        } else {
            this.userLoaded(SessionInfo.currentUser)
        }
    }


    protected userLoaded(user: string) {

    }

    /**
     * Translates string to localizated text
     * @param resourceName Key of the resource
     * @param locale Language
     */
    public translate(resourceName: string, locale: string = AppConfig.DefaultLocale) {
        return Resources.get(resourceName, locale) || resourceName;
    }
}
