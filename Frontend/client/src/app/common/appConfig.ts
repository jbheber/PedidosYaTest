export class AppConfig {
    /**
     * Base url for the server API
     */
    private static baseUrlString: string = "http://localhost:5000/api/";

    /**
     * Sets the default resources localization
     */
    public static get DefaultLocale(): string {
        return "es";
    }

    /**
     * Server API endpoints
     */
    public static ApiEndpoints = {
        Login: `${AppConfig.baseUrlString}auth/login`,
        Logout: `${AppConfig.baseUrlString}auth/logout`,
        checkTokenUrl: `${AppConfig.baseUrlString}auth/`,
        userUrl: `${AppConfig.baseUrlString}user/myAccount`,
        searchRestaurant: `${AppConfig.baseUrlString}restaurants/search`,
        searchReport:`${AppConfig.baseUrlString}reports/searches`
    };

    /**
     * Angular web app routing
     */
    public static WebRoutes = {
        Default: "",
        Login: "login",
        Dashboard: "dashboard",
        Reports: "reports"
    };

    /**
     * Default map properties
     */
    public static MapProperties = {
        latitude: -34.900941, 
        longitude: -56.164719,
        zoom: 15,
        minZoom: 0
    }

    /**
     * Timer configuration for searching restaurants
     */
    public static SearchTimerMinutes = 1;
};