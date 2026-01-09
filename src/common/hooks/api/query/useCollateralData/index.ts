import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { collateralContract } from "@/common/lib/contract-addresses";

export const useCollateralDetails = (loanId: number | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["collateral", "details", loanId],
    queryFn: async () => {
      if (!publicClient || loanId === undefined) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: collateralContract.address as `0x${string}`,
          abi: collateralContract.abi,
          functionName: "getCollateralDetails",
          args: [BigInt(loanId)],
        });
        return result;
      } catch (error) {
        console.error("Failed to fetch collateral details:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && loanId !== undefined,
    refetchInterval: 30000,
  });
};

export const useHasCollateral = (loanId: number | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["collateral", "hasCollateral", loanId],
    queryFn: async () => {
      if (!publicClient || loanId === undefined) return false;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: collateralContract.address as `0x${string}`,
          abi: collateralContract.abi,
          functionName: "hasCollateral",
          args: [BigInt(loanId)],
        });
        return result as boolean;
      } catch (error) {
        console.error("Failed to check collateral:", error);
        return false;
      }
    },
    enabled: enabled && !!publicClient && loanId !== undefined,
    refetchInterval: 30000,
  });
};

export const useIsCryptoLoan = (loanId: number | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["collateral", "isCryptoLoan", loanId],
    queryFn: async () => {
      if (!publicClient || loanId === undefined) return false;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: collateralContract.address as `0x${string}`,
          abi: collateralContract.abi,
          functionName: "isCryptoLoan",
          args: [BigInt(loanId)],
        });
        return result as boolean;
      } catch (error) {
        console.error("Failed to check if crypto loan:", error);
        return false;
      }
    },
    enabled: enabled && !!publicClient && loanId !== undefined,
    refetchInterval: 30000,
  });
};
