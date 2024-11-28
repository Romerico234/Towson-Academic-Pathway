import mongoose from "mongoose";

export const connectToDb = async (uri: string, dbName: string) => {
    await mongoose.connect(uri, {
        dbName,
    });
    console.log("Connected to MongoDB");
};
