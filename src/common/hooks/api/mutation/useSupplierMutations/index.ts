import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePublicClient, useWriteContract, useAccount } from "wagmi";
import { supplyRegisterContract } from "@/common/lib/contract-addresses";

/**
 * Helper type for contract simulation error handling
 */
interface SimulationError extends Error {
  shortMessage?: string;
  cause?: {
    reason?: string;
  };
}

/**
 * Format simulation error to user-friendly message
 */
const formatSimulationError = (error: SimulationError): string => {
  if (error.shortMessage) {
    return error.shortMessage;
  }
  if (error.cause?.reason) {
    return error.cause.reason;
  }
  return error.message || "Contract simulation failed";
};

export const useRegisterSupplier = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      supplierType: number; // uint8 enum
      name: string;
      businessRegistrationNumber: string;
      kycDocumentHash: string;
      stakeAmount: bigint; // sent as msg.value
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "registerSupplier" as const,
        args: [
          params.supplierType,
          params.name,
          params.businessRegistrationNumber,
          params.kycDocumentHash,
        ] as const,
        account,
        value: params.stakeAmount, // Payable function - stake is sent as value
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useAddSupplierStake = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (stakeAmount: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "addStake" as const,
        args: [] as const, // No args - stake is sent as value
        account,
        value: stakeAmount, // Payable function
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useWithdrawSupplierStake = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async () => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "withdrawStake" as const,
        args: [] as const,
        account,
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useUpdateSupplierKYC = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (newKycHash: string) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "updateKYC" as const,
        args: [newKycHash] as const,
        account,
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useRateSupplier = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      supplier: `0x${string}`;
      loanId: bigint;
      rating: bigint;
      review: string;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "rateSupplier" as const,
        args: [params.supplier, params.loanId, params.rating, params.review] as const,
        account,
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useVerifySupplier = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (supplier: `0x${string}`) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "verifySupplier" as const,
        args: [supplier] as const,
        account,
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useSuspendSupplier = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      supplier: `0x${string}`;
      reason: string;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "suspendSupplier" as const,
        args: [params.supplier, params.reason] as const,
        account,
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useDeactivateSupplier = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (supplier: `0x${string}`) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "deactivateSupplier" as const,
        args: [supplier] as const,
        account,
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useReactivateSupplier = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (supplier: `0x${string}`) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "reactivateSupplier" as const,
        args: [supplier] as const,
        account,
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useUpdateReputationScore = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      supplier: `0x${string}`;
      newScore: bigint;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "updateReputationScore" as const,
        args: [params.supplier, params.newScore] as const,
        account,
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};

export const useIncrementSupplierStats = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      supplier: `0x${string}`;
      loanAmount: bigint;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: supplyRegisterContract.address as `0x${string}`,
        abi: supplyRegisterContract.abi,
        functionName: "incrementSupplierStats" as const,
        args: [params.supplier, params.loanAmount] as const,
        account,
      };

      try {
        const { request } = await publicClient.simulateContract(contractConfig);
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
  });
};
