import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePublicClient, useWriteContract, useAccount } from "wagmi";
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

export const useMintToken = () => {
    const queryClient = useQueryClient();
    const publicClient = usePublicClient();
    const { writeContractAsync } = useWriteContract();
    const { address: account } = useAccount();

    return useMutation({
        mutationFn: async (params: {
            tokenAddress: `0x${string}`;
            amount: bigint;
        }) => {
            if (!publicClient) throw new Error("Public client not available");
            if (!account) throw new Error("Wallet not connected");

            const contractConfig = {
                address: params.tokenAddress,
                abi: tokensAbi,
                functionName: "mint" as const,
                args: [account, params.amount] as const,
                account,
            };

            try {
                // Step 1: Simulate the contract call
                const { request } = await publicClient.simulateContract(contractConfig);

                // Step 2: Execute only if simulation succeeds
                const hash = await writeContractAsync(request);

                // Wait for transaction to be mined to update UI balances correctly
                await publicClient.waitForTransactionReceipt({ hash });

                return { hash, success: true };
            } catch (error) {
                const simError = error as SimulationError;
                console.error("Contract simulation failed:", simError);
                throw new Error(formatSimulationError(simError));
            }
        },
        onSuccess: () => {
            // Invalidate all queries related to balances
            queryClient.invalidateQueries();
        },
    });
};
