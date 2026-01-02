// TODO: Modify to match the general state of your application
import { ApiUser } from "@/common/types";

export type AppState = {
  isAuthenticated: boolean;
  user: ApiUser | null;

  // Actions
  login: (user: ApiUser) => void;
  logout: () => void;
};
