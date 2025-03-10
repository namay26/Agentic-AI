import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";
// import { PollerService } from "./services/poller.service.js";
import { Controller } from "./controller/controller.js";

// import { NgrokService } from "./services/ngrok.service.js";
// import { TelegramService } from "./services/telegram.service.js";
// import { IService } from "./services/base.service.js";
// import twitterRouter from "./routes/twitter.js";
// import discordRouter from "./routes/discord.js";
// import cookieParser from "cookie-parser";
// import githubRouter from "./routes/github.js";
// import { AnyType } from "./utils.js";
// import { isHttpError } from "http-errors";
// import { TweetData } from "./types.js";

// Convert ESM module URL to filesystem path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: resolve(__dirname, "../.env"),
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



<<<<<<< Updated upstream
    // setInterval(
    //   () => {
    //     for (const data of twitterPoller.scrappedData) {
    //       const tweetText: string = (data as TweetData).text;
    //       //send tweetText to gaia model
    //       twitterPoller.scrappedData.delete(data);
    //     }
    //   },
    //   1000 * 60 * 10 
    // );
=======
>>>>>>> Stashed changes


app.get("/token", (_req, res) => {
  res.json({data: Controller.getTokensList})
})

app.post("/buy", async (req, res) => {
  const data = req.body;
  const isSuccess = await Controller.buyTokens(data.user, data.amount, data.tokenOut);
  if(isSuccess) {
    res.status(201).send({message: "Buy Successful"})
  } else {
    res.status(500).send({error: "Sever Error"})
  }
})

app.post("/sell", async (req, res) => {
  const data = req.body;
  const isSuccess = await Controller.sellTokens(data.user, data.amount, data.tokenIn);
  if(isSuccess) {
    res.status(201).send({message: "Buy Successful"})
  } else {
    res.status(500).send({error: "Sever Error"})
  }
})


// 404 handler
app.use((_req: Request, _res: Response, _next: NextFunction) => {
  _res.status(404).json({
    message: `Route ${_req.method} ${_req.url} not found`,
  });
});

//get route to trigger poller service
// Start server and initialize services
app.listen(port, async () => {
  console.log(`Server running on PORT: ${port}`);
  console.log("Server Environment:", process.env.NODE_ENV);
  try{
  // Start the gaia polling service
  // const twitterPoller = PollerService.getInstance();
  // twitterPoller.start();

  // setInterval(
  //   () => {
  //     for (const data of twitterPoller.scrappedData) {
  //       const tweetText: string = (data as TweetData).text;
  //       //send tweetText to gaia model
  //       twitterPoller.scrappedData.delete(data);
  //     }
  //   },
  //   1000 * 60 * 10
  // );

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