import * as express from "express";
import * as appConfig from "./config/appConfig";
import * as mongoose from 'mongoose';
import * as request from 'request';
import { Router } from "./routes/allRoutes";
import { logger } from './config/loggerConfig';


export class ServerApp {
    private _app: express.Application;
    private _router: Router;

    constructor() {
        this._app = express();
    };

    /**
     * Starts the server, listening on port 80 by default.
     * @param {number} port number of the port the app will be listening. Default 80.
     */
    public startServer(port: number = 80) {
        logger.info(`Started server at port: ${port}`);

        ServerApp.doServerLogin();
        //Authenticate server every 3 hours
        setInterval(ServerApp.doServerLogin, 1000 * 60 * 60);

        //Typescript does not allow assigning properties of imported modules. 
        //To avoid compile errors used following code:
        (<any>mongoose).Promise = global.Promise;
        // Database Connection
        let mongodbPromise = mongoose.connect(appConfig.DatabaseUrl).then(
            () => {
                logger.info(`Connected to mongo -> dbpath: ${appConfig.DatabaseUrl}`);
            },
            (err) => {
                logger.error(err.message);
            });
        this.router = new Router(this._app);
        this.app.listen(port, () => {
            logger.info(`listening on port ${port}!!`);
        });
    };

    /** 
     * Authenticate server app with PedidosYaAPI
    */
    private static doServerLogin(){
        request.get(appConfig.apiUrls.getAccessToken, (error, response, body) => {
            if (!error) {
                let token: string = JSON.parse(body)["access_token"];
                logger.info(`Server authentication successful`);
                appConfig.authToken.access_token = token;
            } else {
                logger.error(error.message);
            }
        });
    }

    //#region Properties
    public get app(): express.Application {
        return this._app;
    };

    public set app(value: express.Application) {
        this._app = value;
    };

    public get router(): Router {
        return this._router;
    };

    public set router(value: Router) {
        this._router = value;
    };
    //#endregion Properties
};
