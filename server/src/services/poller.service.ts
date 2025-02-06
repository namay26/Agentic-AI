import { BaseService } from "./base.service.js";

export class PollerService extends BaseService {
  private static instance: PollerService;

  private constructor() {
    super();
  }

  public static getInstance(): PollerService {
    if (!PollerService.instance) {
      PollerService.instance = new PollerService();
    }
    return PollerService.instance;
  }

  public async start(): Promise<void> {
    console.log("[PollerService] Starting service...");
    // Start polling
  }

  public async stop(): Promise<void> {
    console.log("[PollerService] Stopping service...");
    // Stop polling
  }
}
