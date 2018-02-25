import * as appConfig from './appConfig';
import * as passport from 'passport';
import * as localStrategy from 'passport-local';
import * as request from 'request';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { logger } from './loggerConfig';

const localOptions = { 
    usernameField: 'username',
    passwordField: 'password'
 };

const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    // Telling Passport where to find the secret
    secretOrKey: appConfig.secret
};

// Setting up local login strategy
const userPasswordLogin = new localStrategy.Strategy(localOptions, function (username, password, done) {
    //replace url string with username & password
    let url = appConfig.apiUrls.getUserLogin.replace("{0}", username).replace("{1}", password);
    let options = {
        method: 'GET',
        url: url,
        headers: {
            "Authorization": appConfig.authToken.access_token
        }
    };
    //API call too authenticate
    request(options, function (error, response, body) {
        if (response.statusCode === 403)
            return done(null, false, { message: "Your login details could not be verified. Please try again." });
        if (response.statusCode === 500)
            return done(null, false, { message: "The server malfunctioned. Please try again later." });

        return done(null, JSON.parse(body)["access_token"]);
    });
});

// Setting up JWT login strategy
const tokenValidationStrategy = new Strategy(jwtOptions, function (payload, done) {
    done(null, payload.id);
});

export function ApplyLoginMethods() {
    passport.use(tokenValidationStrategy);
    passport.use(userPasswordLogin);
};