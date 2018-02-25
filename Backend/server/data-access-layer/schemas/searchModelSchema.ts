import { Schema, Model, model } from "mongoose";
import { ISearchModel } from "../interfaces/ISearchModel";

//================================
// Search Model Schema
//================================
let SearchModelSchema = new Schema(
    {
        countryId: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        fields: {
            type: String,
        }
    },
    {
        timestamps: true
    });

export const SearchModelSet: Model<ISearchModel> = model<ISearchModel>("searchModel", SearchModelSchema);