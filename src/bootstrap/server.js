import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { appRouter } from "../routes/app.router.js";
import expressListRoutes from "express-list-routes";
import { createServer } from "http";
import errorHandler from "../app/middleware/error.middleware.js";
import Logger from "../app/middleware/loggerr.middleware.js";
// import Redis from "../app/providers/redis.provider.js";
import cookieParser from "cookie-parser";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use( cors() );
app.use(cookieParser())

// Logging middleware
app.use(Logger.handle());

// Routes
app.use("/api/v1", appRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  errorHandler.handle(err, req, res, next);
});

// List routes
expressListRoutes(app);

// redis connection
// const redis = new Redis();

export { app, server };
