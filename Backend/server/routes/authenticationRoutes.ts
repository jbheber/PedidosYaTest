import { logger } from '../config/loggerConfig';
import { AuthService } from '../services/authService';

export class AuthenticationRoutes {

    constructor() { }

    //========================================
    // Login Route
    //========================================
    public login(req, res, next) {
        //avoid using the token obtained from PedidosYa API
        res.status(200).json({
            token: 'JWT ' + AuthService.generateToken(req.user)
        }).send();
    };

    //========================================
    // Logout Route
    //========================================
    public logout(req, res) {
        req.logout();
        res.status(200).send();
    };

    //========================================
    // Check Token Handler
    //========================================
    public checkToken(req, res, next) {
        res.status(200).send();
    };
}
/*
UserService.getAllUsers().then(value => {
            logger.info(`User ${req["user"]._id} requested all users`);
            if (value) {
                value.forEach(element => {
                    delete element.password;
                });
                return res.status(200).json(value);
            } else
                return res.status(204).json({ message: "No content" });
        }).catch(reason => {
            logger.error(reason);
            return res.status(500).json({ error: "Ups! an error happened" });
        });
*/