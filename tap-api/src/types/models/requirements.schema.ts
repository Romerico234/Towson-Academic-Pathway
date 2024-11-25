import mongoose, { Schema } from "mongoose";
import { COLLECTION_NAMES } from "../mongoose/collection-names";

const RequirementsSchema: Schema = new Schema(
    {},
    { strict: false, collection: COLLECTION_NAMES.REQUIREMENTS }
);

export default mongoose.model(
    "Requirement",
    RequirementsSchema,
    "requirements"
);
