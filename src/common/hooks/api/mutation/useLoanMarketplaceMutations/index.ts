import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePublicClient, useWriteContract, useAccount } from "wagmi";
import { loanMarketPlaceContract } from "@/common/lib/contract-addresses";

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

export const useCreateLoanRequest = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      collateralToken: `0x${string}`;
      collateralAmount: bigint;
      borrowAsset: `0x${string}`;
      borrowAmount: bigint;
      interestRate: bigint;
      duration: bigint;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      // Check allowance
      const allowance = await publicClient.readContract({
        address: params.collateralToken,
        abi: tokensAbi,
        functionName: "allowance",
        args: [account, loanMarketPlaceContract.address as `0x${string}`],
      });

      if (allowance < params.collateralAmount) {
        console.log("Insufficient allowance, requesting approval...");
        const approvalHash = await writeContractAsync({
          address: params.collateralToken,
          abi: tokensAbi,
          functionName: "approve",
          args: [loanMarketPlaceContract.address as `0x${string}`, params.collateralAmount],
        });

        console.log("Waiting for approval confirmation...");
        await publicClient.waitForTransactionReceipt({ hash: approvalHash });
        console.log("Approval confirmed.");
      }

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "createLoanRequest" as const,
        args: [
          params.collateralToken,
          params.collateralAmount,
          params.borrowAsset,
          params.borrowAmount,
          params.interestRate,
          params.duration,
        ] as const,
        account,
      };

      try {
        // Step 1: Simulate the contract call
        const { request } = await publicClient.simulateContract(contractConfig);

        // Step 2: Execute only if simulation succeeds
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
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
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      lendAsset: `0x${string}`;
      lendAmount: bigint;
      requiredCollateralAsset: `0x${string}`;
      minCollateralAmount: bigint;
      interestRate: bigint;
      duration: bigint;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      // Check allowance
      const allowance = await publicClient.readContract({
        address: params.lendAsset,
        abi: tokensAbi,
        functionName: "allowance",
        args: [account, loanMarketPlaceContract.address as `0x${string}`],
      });

      if (allowance < params.lendAmount) {
        console.log("Insufficient allowance, requesting approval...");
        const approvalHash = await writeContractAsync({
          address: params.lendAsset,
          abi: tokensAbi,
          functionName: "approve",
          args: [loanMarketPlaceContract.address as `0x${string}`, params.lendAmount],
        });

        console.log("Waiting for approval confirmation...");
        await publicClient.waitForTransactionReceipt({ hash: approvalHash });
        console.log("Approval confirmed.");
      }

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "createLenderOffer" as const,
        args: [
          params.lendAsset,
          params.lendAmount,
          params.requiredCollateralAsset,
          params.minCollateralAmount,
          params.interestRate,
          params.duration,
        ] as const,
        account,
      };

      try {
        // Step 1: Simulate the contract call
        const { request } = await publicClient.simulateContract(contractConfig);

        // Step 2: Execute only if simulation succeeds
        const hash = await writeContractAsync(request);
        return { hash, success: true };
      } catch (error) {
        const simError = error as SimulationError;
        console.error("Contract simulation failed:", simError);
        throw new Error(formatSimulationError(simError));
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
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      offerId: bigint;
      collateralAmount: bigint;
      collateralToken: `0x${string}`;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      // Check allowance
      const allowance = await publicClient.readContract({
        address: params.collateralToken,
        abi: tokensAbi,
        functionName: "allowance",
        args: [account, loanMarketPlaceContract.address as `0x${string}`],
      });

      if (allowance < params.collateralAmount) {
        console.log("Insufficient allowance, requesting approval...");
        const approvalHash = await writeContractAsync({
          address: params.collateralToken,
          abi: tokensAbi,
          functionName: "approve",
          args: [loanMarketPlaceContract.address as `0x${string}`, params.collateralAmount],
        });

        console.log("Waiting for approval confirmation...");
        await publicClient.waitForTransactionReceipt({ hash: approvalHash });
        console.log("Approval confirmed.");
      }

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "acceptLenderOffer" as const,
        args: [params.offerId, params.collateralAmount] as const,
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
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const useRepayLoan = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      amount: bigint;
      loanToken: `0x${string}`;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      // Check allowance
      const allowance = await publicClient.readContract({
        address: params.loanToken,
        abi: tokensAbi,
        functionName: "allowance",
        args: [account, loanMarketPlaceContract.address as `0x${string}`],
      });

      if (allowance < params.amount) {
        console.log("Insufficient allowance, requesting approval...");
        const approvalHash = await writeContractAsync({
          address: params.loanToken,
          abi: tokensAbi,
          functionName: "approve",
          args: [loanMarketPlaceContract.address as `0x${string}`, params.amount],
        });

        console.log("Waiting for approval confirmation...");
        await publicClient.waitForTransactionReceipt({ hash: approvalHash });
        console.log("Approval confirmed.");
      }

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "repayLoan" as const,
        args: [params.loanId, params.amount] as const,
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
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const useLiquidateLoan = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "liquidateLoan" as const,
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
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const useCancelLoanRequest = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (requestId: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "cancelLoanRequest" as const,
        args: [requestId] as const,
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
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace", "activeLoanRequests"] });
    },
  });
};

export const useCancelLenderOffer = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (offerId: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "cancelLenderOffer" as const,
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
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace", "activeLenderOffers"] });
    },
  });
};

export const useRequestLoanExtension = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      additionalDuration: bigint;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "requestLoanExtension" as const,
        args: [params.loanId, params.additionalDuration] as const,
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
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const useApproveLoanExtension = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (loanId: bigint) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "approveLoanExtension" as const,
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
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const useFundLoanRequest = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      requestId: bigint;
      loanToken: `0x${string}`;
      amount: bigint;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      // Check allowance
      const allowance = await publicClient.readContract({
        address: params.loanToken,
        abi: tokensAbi,
        functionName: "allowance",
        args: [account, loanMarketPlaceContract.address as `0x${string}`],
      });

      if (allowance < params.amount) {
        console.log("Insufficient allowance, requesting approval...");
        const approvalHash = await writeContractAsync({
          address: params.loanToken,
          abi: tokensAbi,
          functionName: "approve",
          args: [loanMarketPlaceContract.address as `0x${string}`, params.amount],
        });

        console.log("Waiting for approval confirmation...");
        await publicClient.waitForTransactionReceipt({ hash: approvalHash });
        console.log("Approval confirmed.");
      }

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "fundLoanRequest" as const,
        args: [params.requestId] as const,
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
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};

export const usePartialLiquidation = () => {
  const queryClient = useQueryClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const { address: account } = useAccount();

  return useMutation({
    mutationFn: async (params: {
      loanId: bigint;
      percentage: bigint;
    }) => {
      if (!publicClient) throw new Error("Public client not available");
      if (!account) throw new Error("Wallet not connected");

      const contractConfig = {
        address: loanMarketPlaceContract.address as `0x${string}`,
        abi: loanMarketPlaceContract.abi,
        functionName: "partialLiquidation" as const,
        args: [params.loanId, params.percentage] as const,
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
      queryClient.invalidateQueries({ queryKey: ["loanMarketplace"] });
    },
  });
};
