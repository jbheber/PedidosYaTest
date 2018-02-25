"use strict"
import * as express from "express";
import * as appConfig from '../config/appConfig';
import * as request from 'request';
import { logger } from '../config/loggerConfig';
import { SearchModel } from '../models/searchModel';
import { ISearchModel } from '../data-access-layer/interfaces/ISearchModel';
import { ReportService } from '../services/reportService';

export class RestaurantsRoutes {

    constructor() { }


    //========================================
    // Get restaurants by location
    //========================================
    /**
     * Gets restaurants near the location point
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public searchRestaurants(req, res, next) {

        const searchModel: SearchModel = req.body;
        let validationMessage = RestaurantsRoutes.validateSearchModel(searchModel);
        if (validationMessage !== null)
            return res.status(400).json({ message: validationMessage }).send();

        let url = RestaurantsRoutes.generateSearchUrl(searchModel);
        let options = {
            method: 'GET',
            url: url,
            headers: {
                "Authorization": req.user
            }
        };
        //API call too authenticate
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

            ReportService.registerSearch(<ISearchModel>searchModel)
            return res.status(200).json(jsonBody);            
        });
    };

    private static generateSearchUrl(searchModel: SearchModel): string {
        let url = appConfig.apiUrls.getSearchRestaurants.replace("{0}", searchModel.countryId.toString());
        url = url.replace("{lat}", searchModel.latitude.toString());
        url = url.replace("{log}", searchModel.longitude.toString());

        if (searchModel.max !== undefined)
            url += "&max=" + searchModel.max;

        if (searchModel.offset !== undefined)
            url += "&offset=" + searchModel.offset;

        if (searchModel.sortBy !== undefined)
            url += "&sort=" + searchModel.sortBy;

        if (searchModel.fields !== undefined)
            url += "&fields=" + searchModel.fields;

        return url;
    }

    /** 
     * Validates if the required properties are valid
     * Returns validation message if invalid, null if valid
    */
    private static validateSearchModel(searchModel: SearchModel): string {

        if (searchModel.countryId === undefined || searchModel.countryId === 0)
            return "The country is required";

        if (searchModel.latitude === undefined || searchModel.latitude === null)
            return "The latitude is required";

        if (searchModel.longitude === undefined || searchModel.longitude === null)
            return "The longitude is required";

        return null;
    }
}