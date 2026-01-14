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
        const loans: bigint[] = [];
        let i = 0;
        while (i < 50) {
          try {
            const result = await publicClient.readContract({
              address: loanMarketPlaceContract.address as `0x${string}`,
              abi: loanMarketPlaceContract.abi,
              functionName: "borrowerLoans",
              args: [borrowerAddress, BigInt(i)],
            });
            loans.push(result as bigint);
            i++;
          } catch (e) {
            break;
          }
        }
        return loans;
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
        const loans: bigint[] = [];
        let i = 0;
        // Iterate until failure or a reasonable limit
        while (i < 50) {
          try {
            const result = await publicClient.readContract({
              address: loanMarketPlaceContract.address as `0x${string}`,
              abi: loanMarketPlaceContract.abi,
              functionName: "lenderLoans",
              args: [lenderAddress, BigInt(i)],
            });
            loans.push(result as bigint);
            i++;
          } catch (e) {
            break;
          }
        }
        return loans;
      } catch (error) {
        console.error("Failed to fetch lender loans:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!lenderAddress,
    refetchInterval: 15000,
  });
};

export const useUserLoanRequests = (borrowerAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "userLoanRequests", borrowerAddress],
    queryFn: async () => {
      if (!publicClient || !borrowerAddress) return [];
      try {
        const requests: bigint[] = [];
        let i = 0;
        while (i < 50) {
          try {
            const result = await publicClient.readContract({
              address: loanMarketPlaceContract.address as `0x${string}`,
              abi: loanMarketPlaceContract.abi,
              functionName: "userLoanRequests",
              args: [borrowerAddress, BigInt(i)],
            });
            requests.push(result as bigint);
            i++;
          } catch (e) {
            break;
          }
        }
        return requests;
      } catch (error) {
        console.error("Failed to fetch user loan requests:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!borrowerAddress,
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

import { getTokenByAddress } from "@/common/constants";

// Hook to fetch and transform loan requests and lender offers into LoanCardProps
export const useLoanMarketplaceCards = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "cards"],
    queryFn: async () => {
      if (!publicClient) return [];
      try {
        // 1. Fetch active Loan Requests
        const requestIds = (await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "getActiveLoanRequests",
        })) as bigint[];

        // 2. Fetch active Lender Offers
        const offerIds = (await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "getActiveLenderOffers",
        })) as bigint[];

        const marketplaceCards: LoanCardProps[] = [];

        // Process Loan Requests (Borrowers looking for lenders)
        if (requestIds && requestIds.length > 0) {
          for (const requestId of requestIds) {
            try {
              const loanRequest = (await publicClient.readContract({
                address: loanMarketPlaceContract.address as `0x${string}`,
                abi: loanMarketPlaceContract.abi,
                functionName: "loanRequests",
                args: [requestId],
              })) as any;

              if (!loanRequest || (loanRequest as any).length < 12) {
                console.warn(`Invalid loan request data for ${requestId}`);
                continue;
              }

              const status = loanRequest[11];
              if (status !== 0) continue; // 0 = PENDING

              const borrowerAddress = loanRequest[1] as `0x${string}`;
              const collateralAmount = loanRequest[2] as bigint;
              const collateralAsset = loanRequest[3] as `0x${string}`;
              const borrowAsset = loanRequest[4] as `0x${string}`;
              const borrowAmount = loanRequest[5] as bigint;
              const duration = loanRequest[6] as bigint;
              const interestRate = loanRequest[8] as bigint;
              const createdAt = loanRequest[9] as bigint;
              const expireAt = loanRequest[10] as bigint;

              const borrowTokenInfo = getTokenByAddress(borrowAsset);
              const collateralTokenInfo = getTokenByAddress(collateralAsset);

              if (!borrowTokenInfo || !collateralTokenInfo) {
                console.warn(`Skipping loan request ${requestId}: missing token info`, { borrowAsset, collateralAsset });
                continue;
              }

              const borrowAmountNum = Number(formatUnits(borrowAmount, borrowTokenInfo.decimals));
              const collateralAmountNum = Number(formatUnits(collateralAmount, collateralTokenInfo.decimals));
              const apyNum = Number(interestRate) / 100;
              const durationStr = formatDuration(Number(duration));
              const now = Math.floor(Date.now() / 1000);
              const expiresInStr = Number(expireAt) > now ? formatDuration(Number(expireAt) - now) : "Expired";

              marketplaceCards.push({
                id: `request-${requestId}`,
                borrowerAddress: `${borrowerAddress.slice(0, 6)}...${borrowerAddress.slice(-4)}`,
                isVerified: false,
                timeAgo: getTimeAgoString(Number(createdAt)),
                riskLevel: calculateRiskLevel(65), // Placeholder LTV
                borrowAmount: borrowAmountNum,
                borrowToken: borrowTokenInfo.symbol,
                collateralAmount: collateralAmountNum,
                collateralToken: collateralTokenInfo.symbol,
                apy: apyNum,
                ltv: 65,
                duration: durationStr,
                expiresIn: expiresInStr,
                fundedPercentage: 0,
                buttonLabel: "Fund Loan",
                actionType: "fund" as const,
                rawId: requestId,
                rawAmount: borrowAmount,
                rawToken: borrowAsset,
                rawCollateralToken: collateralAsset,
                rawCollateralAmount: collateralAmount,
                rawCreatorAddress: borrowerAddress,
              });
            } catch (err) {
              console.error(`Failed to fetch loan request ${requestId}:`, err);
            }
          }
        }

        // Process Lender Offers (Lenders offering capital)
        if (offerIds && offerIds.length > 0) {
          for (const offerId of offerIds) {
            try {
              const lenderOffer = (await publicClient.readContract({
                address: loanMarketPlaceContract.address as `0x${string}`,
                abi: loanMarketPlaceContract.abi,
                functionName: "getLenderOfferDetails",
                args: [offerId],
              })) as any;

              if (!lenderOffer || lenderOffer.status !== 0) continue; // 0 = PENDING

              const lenderAddress = lenderOffer.lender as `0x${string}`;
              const lendAsset = lenderOffer.lendAsset as `0x${string}`;
              const lendAmount = lenderOffer.lendAmount as bigint;
              const collatAsset = lenderOffer.requiredCollateralAsset as `0x${string}`;
              const minCollatAmount = lenderOffer.minCollateralAmount as bigint;
              const interestRate = lenderOffer.interestRate as bigint;
              const duration = lenderOffer.duration as bigint;
              const createdAt = lenderOffer.createdAt as bigint;
              const expireAt = lenderOffer.expireAt as bigint;

              const lendTokenInfo = getTokenByAddress(lendAsset);
              const collatTokenInfo = getTokenByAddress(collatAsset);

              if (!lendTokenInfo || !collatTokenInfo) {
                console.warn(`Skipping lender offer ${offerId}: missing token info`, { lendAsset, collatAsset });
                continue;
              }

              const lendAmountNum = Number(formatUnits(lendAmount, lendTokenInfo.decimals));
              const collatAmountNum = Number(formatUnits(minCollatAmount, collatTokenInfo.decimals));
              const apyNum = Number(interestRate) / 100;
              const durationStr = formatDuration(Number(duration));
              const now = Math.floor(Date.now() / 1000);
              const expiresInStr = Number(expireAt) > now ? formatDuration(Number(expireAt) - now) : "Expired";

              marketplaceCards.push({
                id: `offer-${offerId}`,
                borrowerAddress: `${lenderAddress.slice(0, 6)}...${lenderAddress.slice(-4)}`, // Lender as card owner
                isVerified: true, // Mark offers as "verified" since they have capital locked
                timeAgo: getTimeAgoString(Number(createdAt)),
                riskLevel: calculateRiskLevel(65),
                borrowAmount: lendAmountNum,
                borrowToken: lendTokenInfo.symbol,
                collateralAmount: collatAmountNum,
                collateralToken: collatTokenInfo.symbol,
                apy: apyNum,
                ltv: 65,
                duration: durationStr,
                expiresIn: expiresInStr,
                fundedPercentage: 100, // Mark as 100% funded as it's a lender offer
                buttonLabel: "Borrow",
                actionType: "borrow" as const,
                rawId: offerId,
                rawAmount: lendAmount,
                rawToken: lendAsset,
                rawCollateralToken: collatAsset,
                rawCollateralAmount: minCollatAmount,
                rawCreatorAddress: lenderAddress,
              });
            } catch (err) {
              console.error(`Failed to fetch lender offer ${offerId}:`, err);
            }
          }
        }

        return marketplaceCards;
      } catch (error) {
        console.error("Failed to fetch loan marketplace cards:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 15000,
  });
};

export const useLenderOffersByUser = (lenderAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "lenderOffersByUser", lenderAddress],
    queryFn: async () => {
      if (!publicClient || !lenderAddress) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "getLenderOffersByLender",
          args: [lenderAddress],
        });
        return result as bigint[];
      } catch (error) {
        console.error("Failed to fetch lender offers by user:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!lenderAddress,
    refetchInterval: 15000,
  });
};

export const useLenderOfferDetails = (offerId: bigint | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "lenderOfferDetails", offerId],
    queryFn: async () => {
      if (!publicClient || offerId === undefined) return null;
      try {
        const result = await publicClient.readContract({
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "getLenderOfferDetails",
          args: [offerId],
        });
        return result;
      } catch (error) {
        console.error(`Failed to fetch lender offer ${offerId} details:`, error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && offerId !== undefined,
    refetchInterval: 10000,
  });
};

export const useLoanDetailsList = (loanIds: bigint[] | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "loanDetailsList", loanIds?.map(id => id.toString())],
    queryFn: async () => {
      if (!publicClient || !loanIds || loanIds.length === 0) return [];
      try {
        const loans = await Promise.all(
          loanIds.map(async (id) => {
            const loan = await publicClient.readContract({
              address: loanMarketPlaceContract.address as `0x${string}`,
              abi: loanMarketPlaceContract.abi,
              functionName: "loans",
              args: [id],
            });
            return loan;
          })
        );
        return loans;
      } catch (error) {
        console.error("Failed to fetch loan details list:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!loanIds && loanIds.length > 0,
    refetchInterval: 15000,
  });
};

export const useLenderOfferDetailsList = (offerIds: bigint[] | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "lenderOfferDetailsList", offerIds?.map(id => id.toString())],
    queryFn: async () => {
      if (!publicClient || !offerIds || offerIds.length === 0) return [];
      try {
        const offers = await Promise.all(
          offerIds.map(async (id) => {
            const offer = await publicClient.readContract({
              address: loanMarketPlaceContract.address as `0x${string}`,
              abi: loanMarketPlaceContract.abi,
              functionName: "getLenderOfferDetails",
              args: [id],
            });
            return offer;
          })
        );
        return offers;
      } catch (error) {
        console.error("Failed to fetch lender offer details list:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!offerIds && offerIds.length > 0,
    refetchInterval: 15000,
  });
};

export const useLoanRequestDetailsList = (requestIds: bigint[] | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "loanRequestDetailsList", requestIds?.map(id => id.toString())],
    queryFn: async () => {
      if (!publicClient || !requestIds || requestIds.length === 0) return [];
      try {
        const requests = await Promise.all(
          requestIds.map(async (id) => {
            const request = await publicClient.readContract({
              address: loanMarketPlaceContract.address as `0x${string}`,
              abi: loanMarketPlaceContract.abi,
              functionName: "loanRequests",
              args: [id],
            });
            return request;
          })
        );
        return requests;
      } catch (error) {
        console.error("Failed to fetch loan request details list:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!requestIds && requestIds.length > 0,
    refetchInterval: 15000,
  });
};

export const useLoanMarketplaceStats = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "globalStats"],
    queryFn: async () => {
      if (!publicClient) return null;
      try {
        const [nextLoanId, nextLoanRequestId, nextLenderOfferId] = await Promise.all([
          publicClient.readContract({
            address: loanMarketPlaceContract.address as `0x${string}`,
            abi: loanMarketPlaceContract.abi,
            functionName: "nextLoanId",
          }),
          publicClient.readContract({
            address: loanMarketPlaceContract.address as `0x${string}`,
            abi: loanMarketPlaceContract.abi,
            functionName: "nextLoanRequestId",
          }),
          publicClient.readContract({
            address: loanMarketPlaceContract.address as `0x${string}`,
            abi: loanMarketPlaceContract.abi,
            functionName: "nextLenderOfferId",
          }),
        ]);
        return {
          totalLoans: Number(nextLoanId),
          totalRequests: Number(nextLoanRequestId),
          totalOffers: Number(nextLenderOfferId),
        };
      } catch (error) {
        console.error("Failed to fetch marketplace stats:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 30000,
  });
};

export const useRecentFundedLoans = (limit = 5, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["loanMarketplace", "recentFundedLoans", limit],
    queryFn: async () => {
      if (!publicClient) return [];
      try {
        const nextLoanId = (await publicClient.readContract({
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "nextLoanId",
        })) as bigint;

        const totalLoans = Number(nextLoanId);
        if (totalLoans === 0) return [];

        const start = Math.max(0, totalLoans - limit);
        const loans: any[] = [];

        for (let i = totalLoans - 1; i >= start; i--) {
          try {
            const loan = (await publicClient.readContract({
              address: loanMarketPlaceContract.address as `0x${string}`,
              abi: loanMarketPlaceContract.abi,
              functionName: "loans",
              args: [BigInt(i)],
            })) as any;

            if (loan) {
              const borrowToken = getTokenByAddress(loan.borrowAsset as `0x${string}`);
              const collateralToken = getTokenByAddress(loan.collateralAsset as `0x${string}`);

              loans.push({
                borrower: `${loan.borrower.slice(0, 6)}...${loan.borrower.slice(-4)}`,
                borrowerFull: loan.borrower,
                collateral: collateralToken?.symbol || "Unknown",
                collateralColor: "#4f46e5", // Default color
                amount: `${formatUnits(loan.principalAmount, borrowToken?.decimals || 18)} ${borrowToken?.symbol || ""}`,
                apr: `${Number(loan.interestRate) / 100}%`,
                time: getTimeAgoString(Number(loan.startTime)),
              });
            }
          } catch (err) {
            console.error(`Failed to fetch loan ${i}:`, err);
          }
        }
        return loans;
      } catch (error) {
        console.error("Failed to fetch recent loans:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 20000,
  });
};
