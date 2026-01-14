import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePublicClient, useWriteContract, useAccount } from "wagmi";
import { fiatLoanBridgeContract } from "@/common/lib/contract-addresses";
import { tokensAbi } from "@/common/abi/tokensAbi";

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

export const useCreateFiatLoanRequest = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      collateralAsset: `0x${string}`;
      collateralAmount: bigint;
      fiatAmount: bigint;
      fiatCurrency: string;
      interestRate: bigint;
      duration: bigint;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      // Check allowance
      const allowance = await publicClient.readContract({
        address: params.collateralAsset,
        abi: tokensAbi,
        functionName: "allowance",
        args: [account, fiatLoanBridgeContract.address as `0x${string}`],
      });

      if (allowance < params.collateralAmount) {
        console.log("Insufficient allowance, requesting approval...");
        const approvalHash = await writeContractAsync({
          address: params.collateralAsset,
          abi: tokensAbi,
          functionName: "approve",
          args: [fiatLoanBridgeContract.address as `0x${string}`, params.collateralAmount],
        });

        console.log("Waiting for approval confirmation...");
        await publicClient.waitForTransactionReceipt({ hash: approvalHash });
        console.log("Approval confirmed.");
      }

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "createFiatLoanRequest" as const,
        args: [
          params.collateralAsset,
          params.collateralAmount,
          params.fiatAmount,
          params.fiatCurrency,
          params.interestRate,
          params.duration,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useCreateFiatLenderOffer = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      fiatAmount: bigint;
      fiatCurrency: string;
      requiredCollateralAsset: `0x${string}`;
      minCollateralAmount: bigint;
      interestRate: bigint;
      duration: bigint;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "createFiatLenderOffer" as const,
        args: [
          params.fiatAmount,
          params.fiatCurrency,
          params.requiredCollateralAsset,
          params.minCollateralAmount,
          params.interestRate,
          params.duration,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan", "activeLenderOffers"] });
    },
  });
};

export const useAcceptFiatLenderOffer = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      offerId: bigint;
      collateralAmount: bigint;
      proofHash: `0x${string}`; // bytes32
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "acceptFiatLenderOffer" as const,
        args: [params.offerId, params.collateralAmount, params.proofHash] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useAcceptFiatLoanRequest = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "acceptFiatLoanRequest" as const,
        args: [loanId] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useConfirmFiatTransfer = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      proofHash: `0x${string}`; // bytes32
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "confirmFiatTransfer" as const,
        args: [params.loanId, params.proofHash] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useConfirmFiatReceipt = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "confirmFiatReceipt" as const,
        args: [loanId] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useConfirmFiatRepayment = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      proofHash: `0x${string}`; // bytes32
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "confirmFiatRepayment" as const,
        args: [params.loanId, params.proofHash] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useConfirmRepaymentReceived = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "confirmRepaymentReceived" as const,
        args: [loanId] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useCancelFiatLoanRequest = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "cancelFiatLoanRequest" as const,
        args: [loanId] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useCancelFiatLenderOffer = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (offerId: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "cancelFiatLenderOffer" as const,
        args: [offerId] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useLiquidateFiatLoan = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "liquidateFiatLoan" as const,
        args: [loanId] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useDisputeFiatLoan = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      reason: string;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "disputeFiatLoan" as const,
        args: [params.loanId, params.reason] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};

export const useResolveDispute = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      inFavorOfBorrower: boolean;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: fiatLoanBridgeContract.address as `0x${string}`,
        abi: fiatLoanBridgeContract.abi,
        functionName: "resolveDispute" as const,
        args: [params.loanId, params.inFavorOfBorrower] as const,
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
      queryClient.invalidateQueries({ queryKey: ["fiatLoan"] });
    },
  });
};
