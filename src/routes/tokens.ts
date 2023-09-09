import express, { Request, Response } from "express";
import DeviceData from "../model/deviceModel"; // Import your model

const router = express.Router();

const getDevices = async (req: Request, res: Response) => {
  try {
    const devices = await DeviceData.find();
    console.log("called");
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const createDevice = async (req: Request, res: Response) => {
  try {
    const device = await DeviceData.create(req.body);
    res.status(201).json(device);
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(400).json({ message: "Bad request." });
  }
};

const updateDevice = async (req: Request, res: Response) => {
  const { deviceToken } = req.params;
  
  // Retrieve the existing document from the database
  const oldDevice = await DeviceData.findOne({ deviceToken });
  
  if (!oldDevice) {
    console.log("[404] Device not found - ", deviceToken);
    return res.status(404).send(`No device with token: ${deviceToken}`);
  }

  // Update the document with the request data
  try {
    const { notificationInterval, timeLastNotificationSent, subscribedCategories } = req.body;

    oldDevice.notificationInterval = notificationInterval ?? oldDevice.notificationInterval;
    oldDevice.timeLastNotificationSent = timeLastNotificationSent ?? oldDevice.timeLastNotificationSent;
    oldDevice.subscribedCategories = subscribedCategories ?? oldDevice.subscribedCategories;

    await oldDevice.save();
    console.log("[200] Updated device - ", deviceToken);
    return res.status(200).json(oldDevice);
  } catch (error) {
    console.log("[400] Error updating device - ", deviceToken);
    return res.status(400).send(`Error updating device with token: ${deviceToken}`);
  }
};

const deleteDevice = async (req: Request, res: Response) => {
  const { deviceToken } = req.params;
  
  try {
    await DeviceData.findOneAndRemove({ deviceToken });
    console.log("[200] Deleted device - ", deviceToken);
    res.status(200).json({ message: "Device deleted successfully with token: " + deviceToken });
  } catch (error) {
    console.log("[500] Error deleting device - ", deviceToken);
    res.status(500).json({ message: "Error deleting device with token: " + deviceToken });
  }
};

router.get("/", getDevices);
router.post("/", createDevice);
router.put("/:deviceToken", updateDevice);
router.delete("/:deviceToken", deleteDevice);

export { router };
