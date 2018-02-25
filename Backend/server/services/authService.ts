"use strict"
import * as jwt from 'jsonwebtoken';
import * as appConfig from '../config/appConfig';

export class AuthService {
    /**
     * Sign in a user and return asociated token.
     */
    public static generateToken(user) {
        //use token to generate a jwt
        return jwt.sign(
            { id: user },
            appConfig.secret,
            { expiresIn: appConfig.TokenTimeToLive }
        );
    };
};
