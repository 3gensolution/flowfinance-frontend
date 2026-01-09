import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegisterSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      supplierType: number;
      name: string;
      businessRegistrationNumber: string;
      kycDocumentHash: string;
      stakeAmount: bigint;
    }) => {
      console.log("Registering supplier:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useAddSupplierStake = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (stakeAmount: bigint) => {
      console.log("Adding supplier stake:", stakeAmount);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useWithdrawSupplierStake = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      console.log("Withdrawing supplier stake");
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useUpdateSupplierKYC = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newKycHash: string) => {
      console.log("Updating supplier KYC:", newKycHash);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useRateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      supplier: `0x${string}`;
      loanId: bigint;
      rating: bigint;
      review: string;
    }) => {
      console.log("Rating supplier:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useVerifySupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (supplier: `0x${string}`) => {
      console.log("Verifying supplier:", supplier);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useSuspendSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      supplier: `0x${string}`;
      reason: string;
    }) => {
      console.log("Suspending supplier:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useDeactivateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (supplier: `0x${string}`) => {
      console.log("Deactivating supplier:", supplier);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useReactivateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (supplier: `0x${string}`) => {
      console.log("Reactivating supplier:", supplier);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useUpdateReputationScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      supplier: `0x${string}`;
      newScore: bigint;
    }) => {
      console.log("Updating reputation score:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useIncrementSupplierStats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      supplier: `0x${string}`;
      loanAmount: bigint;
    }) => {
      console.log("Incrementing supplier stats:", params);
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};
