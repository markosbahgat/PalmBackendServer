import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";

dotenv.config();

export async function connectToDatabase() {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL as string, {
      maxPoolSize: 50,
      minPoolSize: 10,
      retryWrites: true,
      retryReads: true,
      heartbeatFrequencyMS: 10000,
      autoIndex: true,
    });

    const connection: Connection = conn.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err: Error) => {
      console.error("MongoDB connection error:", err);
    });

    connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      try {
        if (connection) {
          await connection.close();
          console.log("MongoDB connection closed through app termination");
        }
        process.exit(0);
      } catch (err) {
        console.error("Error closing MongoDB connection:", err);
        process.exit(1);
      }
    });

    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
