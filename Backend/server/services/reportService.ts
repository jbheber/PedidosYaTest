"use strict"
import { SearchModelRepository } from '../data-access-layer/repository/dal';
import { ISearchModel } from '../data-access-layer/interfaces/ISearchModel';
import { logger } from '../config/loggerConfig';
import { PromiseProvider } from 'mongoose';
const NO_OPTIONS = null;

export class ReportService {
    /**
     * Register a search
     * @param {ISearchModel} searchModel search model for reports
     */
    public static registerSearch(searchModel: ISearchModel): Promise<ISearchModel> {
        let p = new Promise<ISearchModel>((resolve, reject) => {
            let repo = new SearchModelRepository();
            let dbModel = searchModel as ISearchModel;
            repo.create(dbModel, (err, res) => {
                if (err) {
                    logger.error(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        return p;
    };

        /**
     * Get all maintenance Report in db
     */
    public static getAllSearchModels(): Promise<ISearchModel[]> {
        let p = new Promise<ISearchModel[]>((resolve, reject) => {
            let repo = new SearchModelRepository();
            repo.find((err, res: ISearchModel[]) => {
                if (err) {
                    logger.error(err);
                    reject(err);
                }
                else {
                    if (res) {
                        let sortedList = res.sort((a: ISearchModel, b: ISearchModel) => {
                            return b.createdAt.getTime() - a.createdAt.getTime();
                        });
                        resolve(sortedList);
                    }
                    else {
                        resolve(null);
                    }
                }
            });
        });

        return p;
    };
};