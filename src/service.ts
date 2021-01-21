import axios from "axios";
import { Options } from "./types/config";
import { GetInfoResponse, Route } from "./types/core";

export class EclairTs {
  constructor(private options: Options) {}

  private request = async <T>(route: Route) => {
    const { url, headers } = this.options;
    const noProtocol = url.replace("https://", "").replace("http://", "");
    // TODO: support https? Assuming eclair supports it
    const fullUrl = `http://${noProtocol}${route}`;
    return (await axios.post(fullUrl, null, { headers })).data as T;
  };

  getInfo = async () => {
    return this.request<GetInfoResponse>(Route.GetInfo);
  };
}
