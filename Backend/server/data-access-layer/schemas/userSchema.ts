import { Schema, Model, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

//================================
// User Schema
//================================
let UserSchema = new Schema(
    {
        username: {
            type: String,
            lowercase: true,
            unique: true,
            required: true
        },
        isConnected: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    });

/**
 * Action before saving
 */
UserSchema.pre("save", function (next) {
    let now = new Date();
    const user = this;

    if (!user.createdAt) {
        user.createdAt = now;
    }
    user.modifiedAt = now;
});

/**
 * Action before updating
 */
UserSchema.pre("update", function (next) {
    const user = this;
    user.modifiedAt = new Date();
});

export const UserSet: Model<IUser> = model<IUser>("user", UserSchema, 'users', true);