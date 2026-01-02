import { PingResponse } from "@/common/types";
import { getApiClient } from "@/common/lib";
import { resolveRoute, ROUTES } from "@/common/constants";

export const pingApi = async (): Promise<PingResponse> => {
  const response = await getApiClient().get<PingResponse>(resolveRoute(ROUTES.ping));
  return response.data;
};
