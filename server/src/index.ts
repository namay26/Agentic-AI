import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";
import { PollerService } from "./services/poller.service.js";
// import { NgrokService } from "./services/ngrok.service.js";
// import { TelegramService } from "./services/telegram.service.js";
import { IService } from "./services/base.service.js";
// import twitterRouter from "./routes/twitter.js";
// import discordRouter from "./routes/discord.js";
import cookieParser from "cookie-parser";
// import githubRouter from "./routes/github.js";
import { AnyType } from "./utils.js";
import { isHttpError } from "http-errors";

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


// Initialize Telegram bot service
// const telegramService = TelegramService.getInstance();

// Mount Telegram webhook endpoint
// app.use("/telegram/webhook", telegramService.getWebhookCallback());

// Mount Twitter OAuth routes
// app.use("/auth/twitter", twitterRouter);

// Mount Discord OAuth routes
// app.use("/auth/discord", discordRouter);

// Mount GitHub OAuth routes
// app.use("/auth/github", githubRouter);

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
    try{
    // Start the gaia polling service
    const twitterPoller = PollerService.getInstance();

    // Start ngrok tunnel for development
    // const ngrokService = NgrokService.getInstance();
    // await ngrokService.start();
    // services.push(ngrokService);

    // const ngrokUrl = ngrokService.getUrl()!;
    // console.log("NGROK URL:", ngrokUrl);

    // Initialize Telegram bot and set webhook
    // await telegramService.start();
    // await telegramService.setWebhook(ngrokUrl);
    // services.push(telegramService);

    // const botInfo = await telegramService.getBotInfo();
    // console.log("Telegram Bot URL:", `https://t.me/${botInfo.username}`);
  } catch (e) {
    console.error("Failed to start server:", e);
    process.exit(1);
  }
});

