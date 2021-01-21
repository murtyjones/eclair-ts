import axios from "axios";
import WebSocket from "ws";
import { Options } from "./types/config";
import * as T from "./types/core";
import { EclairWebSocket, Route } from "./types/network";

export class EclairTs {
  private socket?: EclairWebSocket;

  private socketKeepAlive?: NodeJS.Timeout;

  constructor(private options: Options) {}

  getInfo = async () => {
    return this.request<T.GetInfoResponse>(Route.GetInfo);
  };

  connect = async (options: T.ConnectRequest): Promise<T.ConnectResponse> => {
    return this.request<T.ConnectResponse>(Route.Connect, options);
  };

  private request = async <T>(route: Route, body?: any): Promise<T> => {
    const { url, headers } = this.options;
    const urlWithoutProtocol = EclairTs.stripProtocol(url);
    // TODO: support https? Assuming eclair supports it
    const fullUrl = `http://${urlWithoutProtocol}${route}`;
    const data = body ? body : null;
    return (await axios.post(fullUrl, data, { headers })).data as T;
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
