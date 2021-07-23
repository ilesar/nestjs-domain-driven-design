export default interface TransportClientInterface {
  connect(): Promise<void>;

  sendRequest(service: string, action: string, data: any): Promise<any>;

  emitEvent(service: string, action: string, data: any): Promise<void>;

  sendFifoRequest(service: string, action: string, data: any): Promise<any>;

  emitFifoEvent(service: string, action: string, data: any): Promise<void>;
}
