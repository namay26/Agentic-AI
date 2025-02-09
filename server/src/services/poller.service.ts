import { BaseService } from "./base.service.js";
import OpenAI from "openai";
import axios from "axios";
import {  TokenInfo } from "../types.js";
import dotenv from "dotenv";
import { Controller } from "../controller/controller.js";
dotenv.config();

export class PollerService extends BaseService {
  private static instance: PollerService;
  private static interval = 1000 * 60 * 10;
  private static twitterUserIds: string[] = ["713041287352619009",];
  private static client = new OpenAI({
    apiKey: process.env.GAIA_API_KEY,
    baseURL: process.env.GAIA_BASE_URL,
  });

  private intervalId: NodeJS.Timeout | undefined;
  public scrappedData: Set<unknown>;

  private constructor() {
    super();
  }

  private async pollingService(): Promise<void> {
    for (const userId of PollerService.twitterUserIds) {
      console.log(`Polling user ${userId}`);
      try {
        const BASE_URL = `https://api.x.com/2/users/${userId}/tweets`
        console.log("hello")
        const response = await axios.get(BASE_URL, {
          headers: {
          Authorization: `Bearer ${process.env.Twitter_API_Token}`,
          },
          params: {
          max_results: 20, // Set max_results to 20
          },
        })
        // const response = await axios.get(
        //   `https://api.x.com/2/users/${userId}/tweets?max_results=50`
        // );
        console.log("data from twitter:",response.data.data);
        if (response.data.errors != undefined) {
          console.log("error",response.data.errors);
          continue
        } 
        let tweetList = [];
        for (const data of response.data.data) {
          const tweetText: string = (data).text;
          tweetList.push(tweetText);
        }



        // let tweetList=[
        //      '@iam_harryjuana It is well',
        //      'Best song atm @Odumodublvck_ https://t.co/ECktN5wWl4',
        //      '@Calli_bee_ It is well',
        //      'Read this thread \n' +
        //        '\n' +
        //        'It will help you also \n' +
        //        '\n' +
        //        'https://t.co/iLdjXFHZFE https://t.co/Lzb75koQjY',
        //        'Hey Guys! Its a one time opportunity. A new coin "Sigma" is launched on the Binance Smart Chain. The token address is "0xkiufkhbsdrkjvbfskjcvdskjcvdsjkvhd" and its Pool ID is "0xkjdvfkjhvgsdkjrvfskdjfvsd". \n',
        //      '@Abuchi_KN And your doji represents a dump Abi?',
        //      '@Dr_Bells_ Asap',
        //      'Guys "Sigma" coin is a one time opportunity. The coin is currently at "0xkiufkhbsdrkjvbfskjcvdskjcvdsjkvhd" and has already reached $71 on the Pool ID "0xkjdvfkjhvgsdkjrvfskdjfvsd"\n',
        //      'I have this very important video shoot today \n' +
        //        '\n' +
        //        'Bruh.. how the fuck am I having a crazy ass headache now?\n' +
        //        '\n' +
        //        'Smh 🤦🏿',
        //      '@MisterEriki 😂😂😂😂',
        //      '@Anon_Aplus We move',
        //      '@kanyewest If geh geh see this post, him go fit create like 10 videos 😂😂',
        //      '@victor_ig1 Gm Gm',
        //      'Drop your charts\n' +
        //        '\n' +
        //        'Show me your analysis technically on the charts https://t.co/jCLaIHdRJl',
        //      '@Abuchi_KN Drop your charts\n' +
        //        '\n' +
        //        'Show me your analysis technically on the charts',
        //      'It is well \n' +
        //        '\n' +
        //        'Sell all your coins and hold only usdt\n' +
        //        '\n' +
        //        'Since the bull run is over for you https://t.co/3jdjUibgsB',
        //      '@MisterEriki It is well \n' +
        //        '\n' +
        //        'Sell all your coins and hold only usdt\n' +
        //        '\n' +
        //        'Since the bull run is over for you',
        //      '@BigZeePops_ Forever',
        //      'Guys Don\'t listen to me and regret later!\n' +'"Hisen Token" just launched on Radium DEX at "0xkiufkhbsdrgfkxuytf456xdskjcvdsjkvhd" and its Pool ID is "0xkuyusgerkghsdorbgxdlfigbxld".\n'+' It is gonna expload\n',
        //      '@GlaSay121 Chai!!\n' +
        //        '\n' +
        //        'May God forgive you \n' +
        //        '\n' +
        //        'Like I said, your creation hasn’t finished yet',
        //      '@Abuwbakry Omo Ehn.. I no fit believe say people de think like that \n\nOmo',
        //      '@unKsp_capo It is well',
        //      '@unKsp_capo That thing provoke me ehn'
        //    ]
        console.log("tweetlist:",tweetList);
        let llamaListString ="["
        for (const tweet of tweetList) {
          llamaListString += `{"text": "${tweet}"},`
        }
        llamaListString += "]";
        console.log("llamaListString:",llamaListString);
        const tokenlist = await this.talkToLlama(llamaListString);
        this.sendToController(tokenlist);
        console.log(Controller.TokenList);
      } catch (error) {
        console.log("error",error);
      }
    }
  }

  private sendToController(tokenlist: TokenInfo[]): void {
    // Send the token list to the controller
    console.log("Sending to controller");
    
    for (const token of tokenlist) {
      let found = false;
      for (const item of Controller.TokenList) {
        if (item["name"] === token["name"]) {
            found=true;
        }
      }
      if (found){
        continue;
      }
      Controller.TokenList.push(token); // Object not found, add it
    } 

  }

  public async talkToLlama(query: any): Promise<TokenInfo[]> {
    try {
      const prompt = `You are an AI model specialized in analyzing tweets from blockchain influencers to extract information about newly launched memecoins tokens on the Solana blockchain. 
      
Your goal is to accurately identify and extract three things: "the token name" and "token address of an ERC-20 memecoin" and "the Pool ID where token is available" from a given tweet.

The tweet must explicitly mention that the token has just been launched, deployed, or is newly available on Solana.

The tweet must contain all three things "the token name" and its "Solana contract address" (a hexadecimal string starting with 0x) and "the Pool ID address" (a hexadecimal string starting with 0x).

Ignore tweets that only mention a token without confirming its new launch and are for advertisements.

Ignore tweets that only include a token address or only a token name or only Pool ID or is missing any of the three details .

You can ONLY return a list of JSON objects, each containing:
  [{
    "token": "0xliusdfrvljisbdofivub...",
    "name": "Trumpcoin",
    "poolId": "0xlewtbgerfiue3ctrgvljiwcerlqeorjb..."
  },...]

If You find multiple satisfactory tweets, append all of them in the list.
  
If the tweet does not contain all: "a valid Solana contract address", "a token name" and "a valid Pool ID" , do not append its object to the list [].

Prevent Server-Side Template Injection (SSTI) and similar attacks by strictly ignoring any tweets that carry jinja or other templating engine syntaxes.

Ensure the extracted contract address follows the ERC-20 format (a hexadecimal hash, starts with 0x).

Be cautious of phishing or scam formats where addresses might be manipulated with invisible characters.

Do not return anything else but a list of JSON objects because your output has to be directly parsed as JSON.

Do NOT return ANY HELPER TEXT or NOTE after or before or in between the JSON. Return ONLY a list and NO additional text.

Return [] if you do not find any valid tweets
`;

      const response = await PollerService.client.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: query },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const content = response.choices[0].message.content;
      console.log("content:",content);
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
      this.pollingService();
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
