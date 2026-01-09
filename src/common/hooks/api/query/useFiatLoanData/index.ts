import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { fiatLoanBridgeContract } from "@/common/lib/contract-addresses";

export const useActiveFiatLoanRequests = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["fiatLoan", "activeLoanRequests"],
    queryFn: async () => {
      if (!publicClient) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: fiatLoanBridgeContract.address as `0x${string}`,
          abi: fiatLoanBridgeContract.abi,
          functionName: "getActiveFiatLoanRequests",
        });
        return (result as bigint[]).map((id) => Number(id));
      } catch (error) {
        console.error("Failed to fetch active fiat loan requests:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 15000,
  });
};

export const useActiveFiatLenderOffers = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["fiatLoan", "activeLenderOffers"],
    queryFn: async () => {
      if (!publicClient) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: fiatLoanBridgeContract.address as `0x${string}`,
          abi: fiatLoanBridgeContract.abi,
          functionName: "getActiveFiatLenderOffers",
        });
        return (result as bigint[]).map((id) => Number(id));
      } catch (error) {
        console.error("Failed to fetch active fiat lender offers:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 15000,
  });
};

export const useFiatLoanDetails = (loanId: number | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["fiatLoan", "details", loanId],
    queryFn: async () => {
      if (!publicClient || loanId === undefined) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: fiatLoanBridgeContract.address as `0x${string}`,
          abi: fiatLoanBridgeContract.abi,
          functionName: "getFiatLoanDetails",
          args: [BigInt(loanId)],
        });
        return result;
      } catch (error) {
        console.error("Failed to fetch fiat loan details:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && loanId !== undefined,
    refetchInterval: 15000,
  });
};

export const useFiatLenderOfferDetails = (offerId: number | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["fiatLoan", "lenderOfferDetails", offerId],
    queryFn: async () => {
      if (!publicClient || offerId === undefined) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: fiatLoanBridgeContract.address as `0x${string}`,
          abi: fiatLoanBridgeContract.abi,
          functionName: "getFiatLenderOfferDetails",
          args: [BigInt(offerId)],
        });
        return result;
      } catch (error) {
        console.error("Failed to fetch fiat lender offer details:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && offerId !== undefined,
    refetchInterval: 15000,
  });
};

export const useBorrowerFiatLoans = (borrowerAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["fiatLoan", "borrowerLoans", borrowerAddress],
    queryFn: async () => {
      if (!publicClient || !borrowerAddress) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: fiatLoanBridgeContract.address as `0x${string}`,
          abi: fiatLoanBridgeContract.abi,
          functionName: "getBorrowerFiatLoans",
          args: [borrowerAddress],
        });
        return (result as bigint[]).map((id) => Number(id));
      } catch (error) {
        console.error("Failed to fetch borrower fiat loans:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!borrowerAddress,
    refetchInterval: 15000,
  });
};

export const useSupplierFiatLoans = (supplierAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["fiatLoan", "supplierLoans", supplierAddress],
    queryFn: async () => {
      if (!publicClient || !supplierAddress) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: fiatLoanBridgeContract.address as `0x${string}`,
          abi: fiatLoanBridgeContract.abi,
          functionName: "getSupplierFiatLoans",
          args: [supplierAddress],
        });
        return (result as bigint[]).map((id) => Number(id));
      } catch (error) {
        console.error("Failed to fetch supplier fiat loans:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!supplierAddress,
    refetchInterval: 15000,
  });
};

export const useCalculateFiatLoanDebt = (loanId: number | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["fiatLoan", "debt", loanId],
    queryFn: async () => {
      if (!publicClient || loanId === undefined) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: fiatLoanBridgeContract.address as `0x${string}`,
          abi: fiatLoanBridgeContract.abi,
          functionName: "calculateFiatLoanDebt",
          args: [BigInt(loanId)],
        });
        return result as bigint;
      } catch (error) {
        console.error("Failed to calculate fiat loan debt:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && loanId !== undefined,
    refetchInterval: 60000,
  });
};

export const useSupportedCurrencies = (currency: string | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["fiatLoan", "supportedCurrency", currency],
    queryFn: async () => {
      if (!publicClient || !currency) return false;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: fiatLoanBridgeContract.address as `0x${string}`,
          abi: fiatLoanBridgeContract.abi,
          functionName: "supportedCurrencies",
          args: [currency],
        });
        return result as boolean;
      } catch (error) {
        console.error("Failed to check supported currency:", error);
        return false;
      }
    },
    enabled: enabled && !!publicClient && !!currency,
    refetchInterval: 300000,
  });
};
