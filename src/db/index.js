import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    if (uri && uri.includes("?")) {
      const [base, query] = uri.split("?");
      uri = `${base.replace(/\/$/, "")}/${DB_NAME}?${query}`;
    } else if (uri) {
      uri = `${uri.replace(/\/$/, "")}/${DB_NAME}`;
    }

    const connectionInstance = await mongoose.connect(uri);
    console.log(
      `\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection FAILED: ", error);
    process.exit(1);
  }
};

export default connectDB;
