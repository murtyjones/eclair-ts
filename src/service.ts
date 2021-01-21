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

  connect = async <R extends T.ConnectResponse>(
    options: T.ConnectRequest
  ): Promise<R> => {
    return this.request<R>(Route.Connect, options);
  };

  disconnect = async <R extends T.DisconnectResponse>(
    options: T.DisconnectRequest
  ): Promise<R> => {
    return this.request<R>(Route.Disconnect, options);
  };

  open = async <R extends T.OpenResponse>(
    options: T.OpenRequest
  ): Promise<R> => {
    return this.request<R>(Route.Open, options);
  };

  close = async <R extends T.CloseResponse>(
    options: T.CloseRequest
  ): Promise<R> => {
    return this.request<R>(Route.Close, options);
  };

  forceClose = async <R extends T.ForceCloseRequest>(
    options: T.ForceCloseResponse
  ): Promise<R> => {
    return this.request<R>(Route.ForceClose, options);
  };

  updateRelayFee = async <R extends T.UpdateRelayFeeRequest>(
    options: T.UpdateRelayFeeResponse
  ): Promise<R> => {
    return this.request<R>(Route.UpdateRelayFee, options);
  };

  peers = async <R extends T.PeersResponse>(): Promise<R> => {
    return this.request<R>(Route.Peers);
  };

  nodes = async <R extends T.NodesResponse>(
    options: T.NodesRequest
  ): Promise<R> => {
    return this.request<R>(Route.Nodes, options);
  };

  allChannels = async <R extends T.AllChannelsResponse>(): Promise<R> => {
    return this.request<R>(Route.AllChannels);
  };

  allUpdates = async <R extends T.AllUpdatesResponse>(
    options: T.AllUpdatesRequest
  ): Promise<R> => {
    return this.request<R>(Route.AllUpdates, options);
  };

  networkStats = async <R extends T.NetworkStatsResponse>(): Promise<R> => {
    return this.request<R>(Route.NetworkStats);
  };

  createInvoice = async <R extends T.CreateInvoiceResponse>(
    options: T.CreateInvoiceRequest
  ): Promise<R> => {
    return this.request<R>(Route.CreateInvoice, options);
  };

  parseInvoice = async <R extends T.ParseInvoiceResponse>(
    options: T.ParseInvoiceRequest
  ): Promise<R> => {
    return this.request<R>(Route.ParseInvoice, options);
  };

  payInvoice = async <R extends T.PayInvoiceResponse>(
    options: T.PayInvoiceRequest
  ): Promise<R> => {
    return this.request<R>(Route.PayInvoice, options);
  };

  sendToNode = async <R extends T.SendToNodeResponse>(
    options: T.SendToNodeRequest
  ): Promise<R> => {
    return this.request<R>(Route.SendToNode, options);
  };

  sendToRoute = async <R extends T.SendToRouteResponse>(
    options: T.SendToRouteRequest
  ): Promise<R> => {
    return this.request<R>(Route.SendToRoute, options);
  };

  getSentInfo = async <R extends T.GetSentInfoResponse>(
    options: T.GetSentInfoRequest
  ): Promise<R> => {
    return this.request<R>(Route.GetSentInfo, options);
  };

  getInvoice = async <R extends T.GetInvoiceResponse>(
    options: T.GetInvoiceRequest
  ): Promise<R> => {
    return this.request<R>(Route.GetInvoice, options);
  };

  listInvoices = async <R extends T.ListInvoicesResponse>(
    options: T.ListInvoicesRequest
  ): Promise<R> => {
    return this.request<R>(Route.ListInvoices, options);
  };

  listPendingInvoices = async <R extends T.ListPendingInvoicesResponse>(
    options: T.ListPendingInvoicesRequest
  ): Promise<R> => {
    return this.request<R>(Route.ListPendingInvoices, options);
  };

  findRoute = async <R extends T.FindRouteResponse>(
    options: T.FindRouteRequest
  ): Promise<R> => {
    return this.request<R>(Route.FindRoute, options);
  };

  findRouteToNode = async <R extends T.FindRouteToNodeResponse>(
    options: T.FindRouteToNodeRequest
  ): Promise<R> => {
    return this.request<R>(Route.FindRouteToNode, options);
  };

  getNewAddress = async <R extends T.GetNewAddressResponse>(): Promise<R> => {
    return this.request<R>(Route.GetNewAddress);
  };

  sendOnChain = async <R extends T.SendOnChainResponse>(
    options: T.SendOnChainRequest
  ): Promise<R> => {
    return this.request<R>(Route.SendOnChain, options);
  };

  onChainBalance = async <R extends T.OnChainBalanceResponse>(): Promise<R> => {
    return this.request<R>(Route.OnChainBalance);
  };

  onChainTransactions = async <R extends T.OnChainTransactionsResponse>(
    options: T.OnChainTransactionsRequest
  ): Promise<R> => {
    return this.request<R>(Route.OnChainTransactions, options);
  };

  signMessage = async <R extends T.SignMessageResponse>(
    options: T.SignMessageRequest
  ): Promise<R> => {
    return this.request<R>(Route.SignMessage, options);
  };

  verifyMessage = async <R extends T.VerifyMessageResponse>(
    options: T.VerifyMessageRequest
  ): Promise<R> => {
    return this.request<R>(Route.VerifyMessage, options);
  };

  audit = async <R extends T.AuditResponse>(
    options: T.AuditRequest
  ): Promise<R> => {
    return this.request<R>(Route.Audit, options);
  };

  networkFees = async <R extends T.NetworkFeesResponse>(
    options: T.NetworkFeesRequest
  ): Promise<R> => {
    return this.request<R>(Route.NetworkFees, options);
  };

  channelStats = async <R extends T.ChannelStatsResponse>(
    options: T.ChannelStatsRequest
  ): Promise<R> => {
    return this.request<R>(Route.ChannelStats, options);
  };

  usableBalances = async <R extends T.UsableBalancesResponse>(): Promise<R> => {
    return this.request<R>(Route.UsableBalances);
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

  private request = async <T>(route: Route, body?: any): Promise<T> => {
    const { url, headers } = this.options;
    const urlWithoutProtocol = EclairTs.stripProtocol(url);
    // TODO: support https? Assuming eclair supports it
    const fullUrl = `http://${urlWithoutProtocol}${route}`;
    const data = body ? body : null;
    return (await axios.post(fullUrl, data, { headers })).data as T;
  };

  private static stripProtocol(url: string) {
    return url.replace("https://", "").replace("http://", "");
  }
}
