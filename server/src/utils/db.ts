import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/youtube";

export async function connectToDatabase() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);
        logger.info("connect to database")
    } catch (e) {
        logger.error(e, "failed to connect to database");
        process.exit(1);
    }
}

export async function disconnectFromDatabase() {
    await mongoose.connection.close();
    logger.info("Disconnect From Database");

    return;
}