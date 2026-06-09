import mongoose, { Document } from "mongoose";

export interface IURL extends Document {
  urlCode: string;
  longUrl: string;
  shortUrl: string;
  date?: Date | string;
}

const URLSchema = new mongoose.Schema<IURL>(
  {
    urlCode: {
      type: String,
      required: true,
    },
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

export const URLModel = mongoose.model<IURL>("Url", URLSchema);
export default URLModel;
