import WebSocket from "ws";
import { WebSocketEventData } from "./core";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface EclairWebSocket extends WebSocket {
  on(
    event: "message",
    listener: (this: WebSocket, data: WebSocketEventData) => void
  ): this;
}
