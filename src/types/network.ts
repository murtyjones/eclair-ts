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

export enum Route {
  GetInfo = "/getinfo",
  Connect = "/connect",
  Disconnect = "/disconnect",
  Open = "/open",
  Close = "/close",
  ForceClose = "/forceclose",
  UpdateRelayFee = "/updaterelayfee",
  Peers = "/peers",
  Nodes = "/nodes",
  AllChannels = "/allchannels",
  AllUpdates = "/allupdates",
  NetworkStats = "/networkstats",
  CreateInvoice = "/createinvoice",
  ParseInvoice = "/parseinvoice",
  PayInvoice = "/payinvoice",
  SendToNode = "/sendtonode",
  SendToRoute = "/sendtoroute",
  GetSentInfo = "/getsentinfo",
  GetReceivedInfo = "/getreceivedinfo",
  GetInvoice = "/getinvoice",
  ListInvoices = "/listinvoices",
  ListPendingInvoices = "/listpendinginvoices",
  FindRoute = "/findroute",
  FindRouteToNode = "/findroutetonode",
  GetNewAddress = "/getnewaddress",
  SendOnChain = "/sendonchain",
  OnChainBalance = "/onchainbalance",
  OnChainTransactions = "/onchaintransactions",
  SignMessage = "/signmessage",
  VerifyMessage = "/verifymessage",
  Audit = "/audit",
  NetworkFees = "/networkfees",
  ChannelStats = "/channelstats",
  UsableBalances = "/usablebalances",
  Websocket = "/ws",
}
