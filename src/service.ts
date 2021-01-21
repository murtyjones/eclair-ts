import axios from "axios";
import WebSocket from "ws";
import { Options } from "./types/config";
import { GetInfoResponse, Route } from "./types/core";
import { EclairWebSocket } from "./types/websocket";

export class EclairTs {
  private socket?: EclairWebSocket;

  private socketKeepAlive?: NodeJS.Timeout;

  constructor(private options: Options) {}

  getInfo = async () => {
    return this.request<GetInfoResponse>(Route.GetInfo);
  };

  private request = async <T>(route: Route): Promise<T> => {
    const { url, headers } = this.options;
    const urlWithoutProtocol = EclairTs.stripProtocol(url);
    // TODO: support https? Assuming eclair supports it
    const fullUrl = `http://${urlWithoutProtocol}${route}`;
    return (await axios.post(fullUrl, null, { headers })).data as T;
  };

  listen = (): EclairWebSocket => {
    const { url, headers } = this.options;
    const urlWithoutProtocol = EclairTs.stripProtocol(url);
    this.socket = new WebSocket(`ws://${urlWithoutProtocol}/ws`, {
      headers,
    });
    // ping every 50s to keep it alive
    this.socketKeepAlive = setInterval(() => {
      if (this.socket) {
        this.socket.ping();
      }
    }, 50e3);
    return this.socket;
  };

  closeListener = (): void => {
    if (this.socketKeepAlive) {
      clearInterval(this.socketKeepAlive);
    }
    this.socket?.close();
  };

  private static stripProtocol(url: string) {
    return url.replace("https://", "").replace("http://", "");
  }
}
