import { useQuery } from "@tanstack/react-query";
import { pingApi } from "@/common/services";

export const usePingApi = () => {
  return useQuery({
    queryKey: ["ping"],
    queryFn: pingApi,
  });
};
