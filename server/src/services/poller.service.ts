import { BaseService } from "./base.service.js";
import axios from "axios";

export class PollerService extends BaseService {
  private static instance: PollerService;
  private static interval = 1000 * 60 * 10;
  private static twitterUserIds: string[] = [];

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
        this.scrappedData.add(response.data);
      } catch (error) {
        console.log("error");
      }
    }
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
