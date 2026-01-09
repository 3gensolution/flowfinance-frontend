import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { loanMarketPlaceContract } from "@/common/lib/contract-addresses";
import { formatUnits } from "viem";
import type { LoanCardProps } from "@/ui/modules/components/LoanCard";

export const useActiveLoanRequests = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "activeLoanRequests"],
    queryFn: async () => {
      if (!publicClient) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "getActiveLoanRequests",
        });
        return result;
      } catch (error) {
        console.error("Failed to fetch active loan requests:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 15000, // Refetch every 15 seconds
  });
};

export const useActiveLenderOffers = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "activeLenderOffers"],
    queryFn: async () => {
      if (!publicClient) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "getActiveLenderOffers",
        });
        return result;
      } catch (error) {
        console.error("Failed to fetch active lender offers:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 15000,
  });
};

export const useLoanDetails = (loanId: number | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "loanDetails", loanId],
    queryFn: async () => {
      if (!publicClient || loanId === undefined) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "loans",
          args: [BigInt(loanId)],
        });
        return result;
      } catch (error) {
        console.error(`Failed to fetch loan ${loanId} details:`, error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && loanId !== undefined,
    refetchInterval: 10000,
  });
};

export const useBorrowerLoans = (borrowerAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "borrowerLoans", borrowerAddress],
    queryFn: async () => {
      if (!publicClient || !borrowerAddress) return [];
      try {
        // Get all loans and filter by borrower (since contract doesn't have getBorrowerLoans)
        const result = await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "borrowerLoans",
          args: [borrowerAddress, BigInt(0)],
        });
        return result;
      } catch (error) {
        console.error("Failed to fetch borrower loans:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!borrowerAddress,
    refetchInterval: 15000,
  });
};

export const useLenderLoans = (lenderAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "lenderLoans", lenderAddress],
    queryFn: async () => {
      if (!publicClient || !lenderAddress) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "lenderLoans",
          args: [lenderAddress, BigInt(0)],
        });
        return result;
      } catch (error) {
        console.error("Failed to fetch lender loans:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!lenderAddress,
    refetchInterval: 15000,
  });
};

export const useLoanHealthFactor = (loanId: number | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "healthFactor", loanId],
    queryFn: async () => {
      if (!publicClient || loanId === undefined) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "getLoanHealthFactor",
          args: [BigInt(loanId)],
        });
        return result as bigint;
      } catch (error) {
        console.error("Failed to fetch health factor:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && loanId !== undefined,
    refetchInterval: 30000,
  });
};

export const useCalculateRepaymentAmount = (loanId: number | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "repaymentAmount", loanId],
    queryFn: async () => {
      if (!publicClient || loanId === undefined) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "calculateRepaymentAmount",
          args: [BigInt(loanId)],
        });
        return result as bigint;
      } catch (error) {
        console.error("Failed to calculate repayment amount:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && loanId !== undefined,
    refetchInterval: 60000,
  });
};

export const useCanLiquidate = (loanId: number | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "canLiquidate", loanId],
    queryFn: async () => {
      if (!publicClient || loanId === undefined) return false;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "canLiquidate",
          args: [BigInt(loanId)],
        });
        return result as boolean;
      } catch (error) {
        console.error("Failed to check liquidation eligibility:", error);
        return false;
      }
    },
    enabled: enabled && !!publicClient && loanId !== undefined,
    refetchInterval: 30000,
  });
};

// Helper functions for data transformation
const calculateRiskLevel = (ltv: number): "Low" | "Medium" | "High" => {
  if (ltv <= 50) return "Low";
  if (ltv <= 75) return "Medium";
  return "High";
};

const getTimeAgoString = (timestamp: number): string => {
  const now = Date.now() / 1000;
  const diff = now - timestamp;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const formatDuration = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  if (days >= 1) return `${days}d`;
  const hours = Math.floor(seconds / 3600);
  if (hours >= 1) return `${hours}h`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m`;
};

// Hook to fetch and transform loan requests into LoanCardProps
export const useLoanMarketplaceCards = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "cards"],
    queryFn: async () => {
      if (!publicClient) return [];
      try {
        // Get active loan request IDs
        const requestIds = (await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "getActiveLoanRequests",
        })) as bigint[];

        if (!requestIds || requestIds.length === 0) return [];

        const loans: LoanCardProps[] = [];

        for (const requestId of requestIds) {
          try {
            const loanRequest = (await publicClient.readContract({
              address: loanMarketPlaceContract.address as `0x${string}`,
              abi: loanMarketPlaceContract.abi,
              functionName: "loanRequests",
              args: [requestId],
            })) as any;

            if (!loanRequest) continue;

            const borrowerAddress = loanRequest.borrower as string;
            const collateralAmount = loanRequest.collateralAmount as bigint;
            const borrowAmount = loanRequest.borrowAmount as bigint;
            const interestRate = loanRequest.interestRate as bigint;
            const duration = loanRequest.duration as bigint;
            const createdAt = loanRequest.createdAt as bigint;
            const expireAt = loanRequest.expireAt as bigint;

            // Calculate LTV (simplified - would need token prices for real calculation)
            const ltv = 65;
            const riskLevel = calculateRiskLevel(ltv);

            // Format values
            const borrowAmountNum = Number(formatUnits(borrowAmount, 6)); // Assuming 6 decimals
            const collateralAmountNum = Number(formatUnits(collateralAmount, 18)); // Assuming 18 decimals
            const apyNum = Number(interestRate) / 100; // Convert from basis points
            const durationStr = formatDuration(Number(duration));
            const now = Math.floor(Date.now() / 1000);
            const expiresInStr = Number(expireAt) > now ? formatDuration(Number(expireAt) - now) : "Expired";

            loans.push({
              id: requestId.toString(),
              borrowerAddress: `${borrowerAddress.slice(0, 6)}...${borrowerAddress.slice(-4)}`,
              isVerified: false,
              timeAgo: getTimeAgoString(Number(createdAt)),
              riskLevel,
              borrowAmount: borrowAmountNum,
              borrowToken: "USDC", // Would need to fetch token symbol from address
              collateralAmount: collateralAmountNum,
              collateralToken: "ETH", // Would need to fetch token symbol from address
              apy: apyNum,
              ltv,
              duration: durationStr,
              expiresIn: expiresInStr,
              fundedPercentage: 0,
              onFundClick: () => console.log(`Fund loan ${requestId}`),
            });
          } catch (err) {
            console.error(`Failed to fetch loan request ${requestId}:`, err);
          }
        }

        return loans;
      } catch (error) {
        console.error("Failed to fetch loan marketplace cards:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 15000, // Refetch every 15 seconds
  });
};;
