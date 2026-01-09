import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDepositCollateral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      depositor: `0x${string}`;
      token: `0x${string}`;
      amount: bigint;
      isCryptoLoan: boolean;
    }) => {
      console.log("Depositing collateral:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collateral"] });
    },
  });
};

export const useReleaseCollateral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      recipient: `0x${string}`;
    }) => {
      console.log("Releasing collateral:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collateral"] });
    },
  });
};

export const useReleasePartialCollateral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      recipient: `0x${string}`;
      amount: bigint;
    }) => {
      console.log("Releasing partial collateral:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collateral"] });
    },
  });
};

export const useSeizeCollateral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      recipient: `0x${string}`;
    }) => {
      console.log("Seizing collateral:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collateral"] });
    },
  });
};

export const useEmergencyWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      token: `0x${string}`;
      amount: bigint;
      recipient: `0x${string}`;
    }) => {
      console.log("Emergency withdraw:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collateral"] });
    },
  });
};
