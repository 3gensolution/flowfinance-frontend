import { ApiResponse } from "@/common/types";

export type ApiUser = {
  id: string;
  email: string;
  name: string;
};

export type ApiLoginPayload = {
  email: string;
  password: string;
};

export type ApiLoginResponse = ApiResponse<{
  user: ApiUser;
  accessToken: string;
}>;

export type ApiGetUserProfileResponse = ApiResponse<ApiUser>;
