import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect = (): Promise<typeof mongoose> => {
  const dbUrl = process.env.DB_URL as string | undefined;
  if (!dbUrl) {
    return Promise.reject(new Error("DB_URL is not defined in environment"));
  }
  return mongoose.connect(dbUrl);
};

export default connect;
