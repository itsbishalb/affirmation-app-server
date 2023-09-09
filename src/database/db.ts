import mongoose from "mongoose";


export const connectDB = async () => {
    console.log("Connecting to MongoDB");
  // Remove restrictions on sending information to the database
  mongoose.set("strictQuery", false);

  try {
    // Load environment variables
    let { MONGO_IP, MONGO_USER, MONGO_PASS } = process.env;

    if (!MONGO_IP || !MONGO_USER || !MONGO_PASS) {
      throw new Error(
        "MONGO_<IP|USER|PASS> cannot be null - please specify in environment variable or file"
      );
    }
    console.log("Connecting to MongoDB");
    console.log(`MONGO_IP: ${MONGO_IP}`);
    console.log(`MONGO_USER: ${MONGO_USER}`);
    console.log(`MONGO_PASS: ${MONGO_PASS}`);
    // Initialise connection to MongoDB
    const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}:27017/AffApp?authSource=admin`;
    console.log(`MONGO_URI: ${MONGO_URI}`);
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error);
    process.exit(1);
  }
};

