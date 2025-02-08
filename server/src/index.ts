import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";

// Convert ESM module URL to filesystem path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: resolve(__dirname, "../../.env"),
});

// Initialize Express app
const app = express();
const port = process.env.PORT || 3001;

// Configure CORS with ALL allowed origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());
app.use(cookieParser());



// 404 handler
app.use((_req: Request, _res: Response, _next: NextFunction) => {
  _res.status(404).json({
    message: `Route ${_req.method} ${_req.url} not found`,
  });
});

// Start server and initialize services
app.listen(port, async () => {
    console.log(`Server running on PORT: ${port}`);
    console.log("Server Environment:", process.env.NODE_ENV);
});

