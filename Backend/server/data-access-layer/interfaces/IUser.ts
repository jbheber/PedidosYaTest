import { Document } from "mongoose";

export interface IUser extends Document {
    _id: any;
    username: string;
    createdAt: Date;
    modifiedAt: Date;
    isConnected: Boolean;
}