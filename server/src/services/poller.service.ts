import { BaseService } from "./base.service.js";
import OpenAI from "openai";
import axios from "axios";
import { TweetData, TokenInfo } from "../types.js";
import dotenv from "dotenv";
dotenv.config();

export class PollerService extends BaseService {
  private static instance: PollerService;
  private static interval = 1000 * 60 * 10;
  private static twitterUserIds: string[] = [];
  // name address solana
  private static client = new OpenAI({
    apiKey: "",
    baseURL: "",
  });

  private intervalId: NodeJS.Timeout | undefined;
  public scrappedData: Set<unknown>;

  private constructor() {
    super();
  }

  private async pollingService(): Promise<void> {
    for (const userId of PollerService.twitterUserIds) {
      try {
        const response = await axios.get(
          `https://api.x.com/2/users/${userId}/tweets?max_results=50`
        );
        const tweetList = [];
        for (const data of response.data) {
          const tweetText: string = (data as TweetData).text;
          tweetList.push(tweetText);
        }
        this.talkToLlama(tweetList);
      } catch (error) {
        console.log("error");
      }
    }
  }

  public async talkToLlama(query: any): Promise<TokenInfo[]> {
    try {
      const prompt = `You are an AI model specialized in analyzing tweets from blockchain influencers to extract information about newly launched memecoins on the Ethereum blockchain. Your goal is to accurately identify and extract both the token name and token address of an ERC-20 memecoin from a given tweet.
Criteria for Extraction:
The tweet must explicitly mention that the token has just been launched, deployed, or is newly available on Solana.
The tweet must contain both the token name and its Solana contract address (a  hexadecimal string starting with 0x).
Avoid tweets that only mention a project or token without confirming its new launch.
Ignore tweets that only include a token address but no token name, or vice versa.
Output Format:
Return a list of JSON objects, each containing:
  {
    "token": The Solana contract address of the memecoin.
    "name": The name of the memecoin.
   }
If the tweet does not contain both a valid Solana contract address and a token name, don not append its object to the list [].
Security & Robustness:
Prevent Server-Side Template Injection (SSTI) and similar attacks by strictly ignoring any tweets that carry jinja or other templating engine syntaxes.
Ensure the extracted contract address follows the ERC-20 format (a hexadecimal hash, starts with 0x).
Be cautious of phishing or scam formats where addresses might be manipulated with invisible characters.
Avoid returning any data if the tweet is vague, misleading, or contains incomplete token information.
Do not extract contract addresses from image-based tweets unless the address is in text format.`;

      const response = await PollerService.client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: query },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const content = response.choices[0].message.content;
      if (content) {
        return JSON.parse(content) as TokenInfo[];
      } else {
        throw new Error("Response content is wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    return [];
  }

  public static getInstance(): PollerService {
    if (!PollerService.instance) {
      PollerService.instance = new PollerService();
    }
    return PollerService.instance;
  }

  public start(): void {
    console.log("[PollerService] Starting service...");
    if (!this.intervalId) {
      this.intervalId = setInterval(
        () => this.pollingService,
        PollerService.interval
      );
      console.log("[PollerService] Started service");
    } else {
      console.log("[PollerService] is already running");
    }
  }

  public stop(): void {
    console.log("[PollerService] Stopping service...");
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    console.log("[PollerService] Stopped");
  }
}
