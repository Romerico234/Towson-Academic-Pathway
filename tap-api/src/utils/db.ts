import { MongoClient, Db, MongoClientOptions } from "mongodb";

let db: Db | null = null;

export async function connectToDb(uri: string, dbName: string): Promise<void> {
    const options: MongoClientOptions = {
        tls: true,
        tlsAllowInvalidCertificates: false,
    };
    const client = await MongoClient.connect(uri, options);
    db = client.db(dbName);
    console.log("Connected to MongoDB");
}

export function getDb(): Db {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db;
}
