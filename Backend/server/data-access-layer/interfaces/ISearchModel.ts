import { Document } from "mongoose";

export interface ISearchModel extends Document {
    _id: any;
    countryId: number;
    latitude: number;
    longitude: number;
    sortBy?: string;
    max?: number;
    offset?: number;
    fields?: string;
    createdAt: Date;
}