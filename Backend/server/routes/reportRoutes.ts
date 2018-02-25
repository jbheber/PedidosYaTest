"use strict"
import * as express from "express";
import * as appConfig from '../config/appConfig';
import * as request from 'request';
import { SearchModel } from '../models/searchModel';
import { ReportService } from '../services/reportService';

export class ReportRoutes {

    constructor() { }


    //========================================
    // Get previous searches
    //========================================
    /**
     * Gets previous searches
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public getSearches(req, res, next) {
        ReportService.getAllSearchModels().then(value => {
            if (value) {
                return res.status(200).json(value);
            } else
                return res.status(204).send();
        }).catch(reason => {
            return res.status(500).send({ "error": "Ups! an error happened" });
        });
    };
}