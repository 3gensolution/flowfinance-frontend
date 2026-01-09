import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWriteContract } from "wagmi";
import { loanMarketPlaceContract } from "@/common/lib/contract-addresses";

export const useCreateLoanRequest = () => {
  const queryClient = useQueryClient();
  const { writeContractAsync } = useWriteContract();

  return useMutation({
    mutationFn: async (params: {
      collateralToken: `0x${string}`;
      collateralAmount: bigint;
      borrowAsset: `0x${string}`;
      borrowAmount: bigint;
      interestRate: bigint;
      duration: bigint;
    }) => {
      try {
        const hash = await writeContractAsync({
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "createLoanRequest",
          args: [
            params.collateralToken,
            params.collateralAmount,
            params.borrowAsset,
            params.borrowAmount,
            params.interestRate,
            params.duration,
          ],
        });
        return { hash, success: true };
      } catch (error) {
        console.error("Failed to create loan request:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace", "activeLoanRequests"] });
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace", "borrowerLoans"] });
    },
  });
};

export const useCreateLenderOffer = () => {
  const queryClient = useQueryClient();
  const { writeContractAsync } = useWriteContract();

  return useMutation({
    mutationFn: async (params: {
      lendAsset: `0x${string}`;
      lendAmount: bigint;
      requiredCollateralAsset: `0x${string}`;
      minCollateralAmount: bigint;
      interestRate: bigint;
      duration: bigint;
    }) => {
      try {
        const hash = await writeContractAsync({
          address: loanMarketPlaceContract.address as `0x${string}`,
          abi: loanMarketPlaceContract.abi,
          functionName: "createLenderOffer",
          args: [
            params.lendAsset,
            params.lendAmount,
            params.requiredCollateralAsset,
            params.minCollateralAmount,
            params.interestRate,
            params.duration,
          ],
        });
        return { hash, success: true };
      } catch (error) {
        console.error("Failed to create lender offer:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace", "activeLenderOffers"] });
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace", "lenderOffers"] });
    },
  });
};

export const useAcceptLenderOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      offerId: bigint;
      collateralAmount: bigint;
    }) => {
      console.log("Accepting lender offer:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const useRepayLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      amount: bigint;
    }) => {
      console.log("Repaying loan:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const useLiquidateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      console.log("Liquidating loan:", loanId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const useCancelLoanRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: bigint) => {
      console.log("Cancelling loan request:", requestId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace", "activeLoanRequests"] });
    },
  });
};

export const useCancelLenderOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (offerId: bigint) => {
      console.log("Cancelling lender offer:", offerId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace", "activeLenderOffers"] });
    },
  });
};

export const useRequestLoanExtension = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      additionalDuration: bigint;
    }) => {
      console.log("Requesting loan extension:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const useApproveLoanExtension = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      console.log("Approving loan extension:", loanId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const useFundLoanRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: bigint) => {
      console.log("Funding loan request:", requestId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const usePartialLiquidation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      percentage: bigint;
    }) => {
      console.log("Partial liquidation:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};
