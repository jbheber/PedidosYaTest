"use strict"
import * as express from "express";
import * as appConfig from '../config/appConfig';
import * as request from 'request';
import { logger } from '../config/loggerConfig';

export class UserRoutes {

    constructor() { }

    //========================================
    // Get user info
    //========================================
    /**
     * Gets current user account from Pedidos Ya API
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public getInfo(req, res, next) {
        let options = {
            method: 'GET',
            url: appConfig.apiUrls.getUserAccount,
            headers: {
                "Authorization": req.user
            }
        };
        //API call to get account info
        request(options, function (error, response, body) {
            if (response.statusCode === 403)
                return res.status(403)
                    .json({ message: "You must be logged in to get your account info" })
                    .send();
            if (response.statusCode === 500)
                return res.status(500)
                .json({ message: "The server malfunctioned. Please try again later." })
                .send();
            let jsonBody = JSON.parse(body);
            
            return res.status(200).json(jsonBody).send();
        });
    };

};