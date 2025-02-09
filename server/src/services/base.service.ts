export interface IService {
    start(): void;
    stop(): void;
  }
  export abstract class BaseService implements IService {
    abstract start(): void;
    abstract stop(): void;
  }
