import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePublicClient, useWriteContract, useAccount } from "wagmi";
import { collateralContract } from "@/common/lib/contract-addresses";

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

export const useDepositCollateral = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      depositor: `0x${string}`;
      token: `0x${string}`;
      amount: bigint;
      isCryptoLoan: boolean;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: collateralContract.address as `0x${string}`,
        abi: collateralContract.abi,
        functionName: "depositCollateral" as const,
        args: [
          params.loanId,
          params.depositor,
          params.token,
          params.amount,
          params.isCryptoLoan,
        ] as const,
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
      queryClient.invalidateQueries({ queryKey: ["collateral"] });
    },
  });
};

export const useReleaseCollateral = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      recipient: `0x${string}`;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: collateralContract.address as `0x${string}`,
        abi: collateralContract.abi,
        functionName: "releaseCollateral" as const,
        args: [params.loanId, params.recipient] as const,
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
      queryClient.invalidateQueries({ queryKey: ["collateral"] });
    },
  });
};

export const useReleasePartialCollateral = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      recipient: `0x${string}`;
      amount: bigint;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: collateralContract.address as `0x${string}`,
        abi: collateralContract.abi,
        functionName: "releasePartialCollateral" as const,
        args: [params.loanId, params.recipient, params.amount] as const,
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
      queryClient.invalidateQueries({ queryKey: ["collateral"] });
    },
  });
};

export const useSeizeCollateral = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      recipient: `0x${string}`;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: collateralContract.address as `0x${string}`,
        abi: collateralContract.abi,
        functionName: "seizeCollateral" as const,
        args: [params.loanId, params.recipient] as const,
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
      queryClient.invalidateQueries({ queryKey: ["collateral"] });
    },
  });
};

export const useEmergencyWithdraw = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      token: `0x${string}`;
      amount: bigint;
      recipient: `0x${string}`;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: collateralContract.address as `0x${string}`,
        abi: collateralContract.abi,
        functionName: "emergencyWithdraw" as const,
        args: [params.token, params.amount, params.recipient] as const,
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
      queryClient.invalidateQueries({ queryKey: ["collateral"] });
    },
  });
};
