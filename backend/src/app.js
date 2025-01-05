import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bookingRoutes from "./routes/bookingRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/bookings", bookingRoutes);
app.use(errorHandler);

export default app;
