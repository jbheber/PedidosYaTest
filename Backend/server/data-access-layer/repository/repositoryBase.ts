import { Document, Model, Types, DocumentQuery, Query, SaveOptions } from 'mongoose';
import { IRead } from './IRead';
import { IWrite } from './IWrite';

export class RepositoryBase<T extends Document> implements IRead<T>, IWrite<T> {

    private _model: Model<Document>;

    constructor(schemaModel: Model<Document>) {
        this._model = schemaModel;
    };

    /**
     * Create new record in database.
     * @param {T} item Item to record in database.
     * @param callback Function to handle errors or results.
     */
    create(item: T, callback: (error: any, result: T) => void) {
        this._model.create(item, callback);
    };

    /**
     * Get all records in database.
     * @param callback Function to handle the response.
     */
    retrieve(callback: (error: any, result: T) => void) {
        this._model.find({}, callback);
    };

    /**
     * Update record in database
     * @param _id Object identifier
     * @param item Object to update
     * @param callback Function to handle the response
     */
    update(_id: Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    };

     /**
     * Save record database.
     * @param {T} item Item to record in database.
     * @param {SaveOptions} options Save options
     * @param callback Function to handle errors or results.
     */
    save(item: T, options?: SaveOptions, callback?: (error: any, result: T) => void): Promise<T> {
        return item.save(options, callback);
    };

    /**
     * Delete record in database
     * @param _id Object identifier
     * @param callback Function to handle the response.
     */
    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    };

    /**
     * Find record by its identifier.
     * @param _id Object identifier.
     * @param callback Function to handle the response.
     * @param populate Space delimited path names used to populate referenced entities.
     */
    findById(_id: string, callback: (error: any, result: T) => void, populate?: string) {
        this._model.findById(_id, callback);
    };

    /**
     * First object that matches the condition.
     * @param cond Object that have the conditions to match.
     * @param callback Function to handle the response.
     */
    findOne(cond?: Object, callback?: (err: any, res: T) => void): Query<T | any> {
        return this._model.findOne(cond, callback);
    };

    /**
     * Get all records that matches a condition.
     * @param cond Object that have the conditions to match.
     * @param options Optional fields to return
     * @param callback Function to handle the response.
     */
    find(cond?: Object, options?: Object, callback?: (err: any, res: T[]) => void): Query<T[]> {
        return this._find(cond, options, callback);
    };


    private _find(cond?: Object, options?: Object, callback?: (err: any, res: any[]) => void): Query<any[]> {
        return this._model.find(cond, options, callback);
    };

    /**
     * Remove all records from database.
     * @param callback Function to handle the response.
     */
    clearContent(callback: (error: any, result: any) => void) {
        this._model.remove({}, (err) => callback(err, null));
    };

    private toObjectId(_id: string): Types.ObjectId {
        return Types.ObjectId.createFromHexString(_id);
    };

}