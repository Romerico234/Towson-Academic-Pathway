import mongoose, { Schema, Document, Types } from "mongoose";
import { COLLECTION_NAMES } from "../mongodb/collection-names";

export interface IToken extends Document {
    userId: Types.ObjectId;
    token: string;
    type: "access" | "refresh";
    expiresAt: Date;
    isRevoked: boolean;
    lastUsed: Date;
}

const TokenSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            enum: ["access", "refresh"],
            default: "access",
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        isRevoked: {
            type: Boolean,
            default: false,
        },
        lastUsed: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAMES.TOKENS,
    }
);

export default mongoose.model<IToken>("Token", TokenSchema);
