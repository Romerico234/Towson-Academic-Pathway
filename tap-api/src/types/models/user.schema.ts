import mongoose, { Schema, Types, Document } from "mongoose";
import { COLLECTION_NAMES } from "../mongodb/collection-names";

export interface IUser {
    _id: Types.ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    { timestamps: true, collection: COLLECTION_NAMES.AUTH }
);

export default mongoose.model<IUser>("User", UserSchema);
