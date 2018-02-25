import * as express from "express";
import * as cors from "cors"
import * as passportService from '../config/passportConfig';
import * as passport from 'passport';
import * as bodyParser from "body-parser";
import * as path from "path";
import { AuthenticationRoutes } from './authenticationRoutes';
import { UserRoutes } from './userRoutes';
import { RestaurantsRoutes } from "./restaurantsRoutes";
import { ReportRoutes } from "./reportRoutes";


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });
//options for cors midddleware
const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: 'http://localhost:4200',
    preflightContinue: false
};

export class Router {

    private _app: express.Application;
    private _authRoutes: express.Router;
    private _userRoutes: express.Router;
    private _restaurantRoutes: express.Router;
    private _reportRoutes: express.Router;    
    private _apiRoutes: express.Router;

    constructor(app: express.Application) {
        this._app = app;
        passportService.ApplyLoginMethods();
        // Initializing route groups
        this._apiRoutes = express.Router();
        this._authRoutes = express.Router();
        this._userRoutes = express.Router();
        this._restaurantRoutes = express.Router();
        this._reportRoutes = express.Router();

        this.initializeRoutes();
    };

    /** 
     * Registers application api endpoints
    */
    protected initializeRoutes() {
        //use cors middleware
        this._app.use(cors());
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._app.use(bodyParser.json());

        //=========================
        // Auth Routes
        //=========================

        // Set auth routes as subgroup/middleware to apiRoutes
        this._apiRoutes.use(cors());
        this._apiRoutes.use('/auth', this._authRoutes);

        this._authRoutes.use(cors());

        // Check token
        this._authRoutes.get('/', requireAuth, AuthenticationRoutes.prototype.checkToken);

        // Login route
        this._authRoutes.post('/login', requireLogin, AuthenticationRoutes.prototype.login);

        // Logout route
        this._authRoutes.get('/logout', AuthenticationRoutes.prototype.logout);

        this._authRoutes.options("*", cors());

        //=========================
        // User Routes
        //=========================

        // Set user routes as subgroup/middleware to apiRoutes
        this._apiRoutes.use('/user', this._userRoutes);

        // Get user by id route
        this._userRoutes.get('/myAccount', requireAuth,
            UserRoutes.prototype.getInfo);

        //=========================
        // Restaurants Routes
        //=========================

        // Set restaurants routes as subgroup/middleware to apiRoutes
        this._apiRoutes.use('/restaurants', this._restaurantRoutes);

        // Get user by id route
        this._restaurantRoutes.post('/search', requireAuth,
            RestaurantsRoutes.prototype.searchRestaurants);

        //=========================
        // Report Routes
        //=========================

        // Set restaurants routes as subgroup/middleware to apiRoutes
        this._apiRoutes.use('/reports', this._reportRoutes);

        // Get user by id route
        this._reportRoutes.get('/searches', requireAuth,
            ReportRoutes.prototype.getSearches);

        //=========================
        // API
        //=========================

        // Set url for API group routes
        this._app.use('/api', this._apiRoutes);

        //enable pre-flight
        this._app.options("*", cors());
        this._apiRoutes.options("*", cors());


        // Catch all other routes and return 404 not found
        this._app.get('/api/*', (req: express.Request, res: express.Response) => {
            res.sendStatus(404);
        });
        this._app.post('/api/*', (req: express.Request, res: express.Response) => {
            res.sendStatus(404);
        });
    };

};
