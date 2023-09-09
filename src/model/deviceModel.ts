import mongoose from "mongoose";

const deviceData = new mongoose.Schema(
  {
    deviceToken: {
      type: String, 
      required: [true, "Device token is required"],
      unique: true, // Ensure deviceToken is unique
      alias: "_id", // Map deviceToken to _id as the primary key
    },
    notificationInterval: {
      type: Number,
      required: [true, "Notification interval is required"],
    },
    timeLastNotificationSent: {
      type: Date, 
      required: false,
    },
    subscribedCategories: {
      type: [String],
      required: [true, "Subscribed categories are required"],
    },
  }, {
    timestamps: true,
  }
);

export default mongoose.model("DeviceTokens", deviceData);
