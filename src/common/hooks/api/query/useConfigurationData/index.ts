import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { configurationContract } from "@/common/lib/contract-addresses";

export const useTokenPriceInUSD = (tokenAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["configuration", "tokenPrice", tokenAddress],
    queryFn: async () => {
      if (!publicClient || !tokenAddress) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: configurationContract.address as `0x${string}`,
          abi: configurationContract.abi,
          functionName: "getTokenPriceInUSD",
          args: [tokenAddress],
        });
        return result as bigint;
      } catch (error) {
        console.error("Failed to fetch token price:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && !!tokenAddress,
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useCalculateHealthFactor = (
  collateralToken: `0x${string}` | undefined,
  collateralAmount: bigint | undefined,
  borrowToken: `0x${string}` | undefined,
  totalDebt: bigint | undefined,
  enabled = true
) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["configuration", "healthFactor", collateralToken, collateralAmount, borrowToken, totalDebt],
    queryFn: async () => {
      if (!publicClient || !collateralToken || !borrowToken || collateralAmount === undefined || totalDebt === undefined) {
        return null;
      }
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: configurationContract.address as `0x${string}`,
          abi: configurationContract.abi,
          functionName: "calculateHealthFactor",
          args: [collateralToken, collateralAmount, borrowToken, totalDebt],
        });
        return result as bigint;
      } catch (error) {
        console.error("Failed to calculate health factor:", error);
        return null;
      }
    },
    enabled:
      enabled &&
      !!publicClient &&
      !!collateralToken &&
      !!borrowToken &&
      collateralAmount !== undefined &&
      totalDebt !== undefined,
  });
};

export const useCalculateCollateralValueInUSD = (
  collateralToken: `0x${string}` | undefined,
  collateralAmount: bigint | undefined,
  enabled = true
) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["configuration", "collateralValue", collateralToken, collateralAmount],
    queryFn: async () => {
      if (!publicClient || !collateralToken || collateralAmount === undefined) {
        return null;
      }
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: configurationContract.address as `0x${string}`,
          abi: configurationContract.abi,
          functionName: "calculateCollateralValueInUSD",
          args: [collateralToken, collateralAmount],
        });
        return result as bigint;
      } catch (error) {
        console.error("Failed to calculate collateral value:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && !!collateralToken && collateralAmount !== undefined,
  });
};

export const useCalculateLoanValueInUSD = (
  loanToken: `0x${string}` | undefined,
  loanAmount: bigint | undefined,
  enabled = true
) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["configuration", "loanValue", loanToken, loanAmount],
    queryFn: async () => {
      if (!publicClient || !loanToken || loanAmount === undefined) {
        return null;
      }
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: configurationContract.address as `0x${string}`,
          abi: configurationContract.abi,
          functionName: "calculateLoanValueInUSD",
          args: [loanToken, loanAmount],
        });
        return result as bigint;
      } catch (error) {
        console.error("Failed to calculate loan value:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && !!loanToken && loanAmount !== undefined,
  });
};

export const useIsAssetSupported = (assetAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["configuration", "isAssetSupported", assetAddress],
    queryFn: async () => {
      if (!publicClient || !assetAddress) return false;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: configurationContract.address as `0x${string}`,
          abi: configurationContract.abi,
          functionName: "isAssetSupported",
          args: [assetAddress],
        });
        return result as boolean;
      } catch (error) {
        console.error("Failed to check if asset is supported:", error);
        return false;
      }
    },
    enabled: enabled && !!publicClient && !!assetAddress,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

export const useConfigurationParams = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["configuration", "params"],
    queryFn: async () => {
      if (!publicClient) return null;
      try {
        const [maxInterestRate, minCollateralRatio, maxLoanDuration, minLoanDuration, gracePeriod, platformFeeRate, liquidationThreshold] =
          await Promise.all([
            publicClient.readContract({
              account: undefined,
              address: configurationContract.address as `0x${string}`,
              abi: configurationContract.abi,
              functionName: "maxInterestRate",
            }),
            publicClient.readContract({
              account: undefined,
              address: configurationContract.address as `0x${string}`,
              abi: configurationContract.abi,
              functionName: "minCollateralRatio",
            }),
            publicClient.readContract({
              account: undefined,
              address: configurationContract.address as `0x${string}`,
              abi: configurationContract.abi,
              functionName: "maxLoanDuration",
            }),
            publicClient.readContract({
              account: undefined,
              address: configurationContract.address as `0x${string}`,
              abi: configurationContract.abi,
              functionName: "minLoanDuration",
            }),
            publicClient.readContract({
              account: undefined,
              address: configurationContract.address as `0x${string}`,
              abi: configurationContract.abi,
              functionName: "gracePeriod",
            }),
            publicClient.readContract({
              account: undefined,
              address: configurationContract.address as `0x${string}`,
              abi: configurationContract.abi,
              functionName: "platformFeeRate",
            }),
            publicClient.readContract({
              account: undefined,
              address: configurationContract.address as `0x${string}`,
              abi: configurationContract.abi,
              functionName: "liquidationThreshold",
            }),
          ]);

        return {
          maxInterestRate: maxInterestRate as bigint,
          minCollateralRatio: minCollateralRatio as bigint,
          maxLoanDuration: maxLoanDuration as bigint,
          minLoanDuration: minLoanDuration as bigint,
          gracePeriod: gracePeriod as bigint,
          platformFeeRate: platformFeeRate as bigint,
          liquidationThreshold: liquidationThreshold as bigint,
        };
      } catch (error) {
        console.error("Failed to fetch configuration params:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 600000, // Refetch every 10 minutes
  });
};
