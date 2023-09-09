import express, { Application } from "express";
import { connectDB } from "./database/db";
import * as dotenv from "dotenv";
import {router as quotesRouter} from "./routes/quotes";
import {router as deviceRouter} from "./routes/tokens";

dotenv.config({ path: "./.env" });
let {PORT} = process.env;

connectDB();

const app: Application = express();
// Set the API to handle JSON
app.use(express.json());

// Enable Cross-Origin Resource Sharing
const cors = require("cors");
app.use(cors({origin: "*"}));


app.use(express.urlencoded({ extended: false }));

// Add routers for endpoints
app.use("/api/quotes", quotesRouter);
app.use("/api/device", deviceRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
