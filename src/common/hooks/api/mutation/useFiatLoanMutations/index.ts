import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateFiatLoanRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      collateralAsset: `0x${string}`;
      collateralAmount: bigint;
      fiatAmount: bigint;
      fiatCurrency: string;
      interestRate: bigint;
      duration: bigint;
    }) => {
      console.log("Creating fiat loan request:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useCreateFiatLenderOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      fiatAmount: bigint;
      fiatCurrency: string;
      requiredCollateralAsset: `0x${string}`;
      minCollateralAmount: bigint;
      interestRate: bigint;
      duration: bigint;
    }) => {
      console.log("Creating fiat lender offer:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan", "activeLenderOffers"] });
    },
  });
};

export const useAcceptFiatLenderOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      offerId: bigint;
      collateralAmount: bigint;
      proofHash: string;
    }) => {
      console.log("Accepting fiat lender offer:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useAcceptFiatLoanRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      console.log("Accepting fiat loan request:", loanId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useConfirmFiatTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      proofHash: string;
    }) => {
      console.log("Confirming fiat transfer:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useConfirmFiatReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      console.log("Confirming fiat receipt:", loanId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useConfirmFiatRepayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      proofHash: string;
    }) => {
      console.log("Confirming fiat repayment:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useConfirmRepaymentReceived = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      console.log("Confirming repayment received:", loanId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useCancelFiatLoanRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      console.log("Cancelling fiat loan request:", loanId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useCancelFiatLenderOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (offerId: bigint) => {
      console.log("Cancelling fiat lender offer:", offerId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useLiquidateFiatLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      console.log("Liquidating fiat loan:", loanId);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useDisputeFiatLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      reason: string;
    }) => {
      console.log("Disputing fiat loan:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useResolveDispute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      inFavorOfBorrower: boolean;
    }) => {
      console.log("Resolving dispute:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};
