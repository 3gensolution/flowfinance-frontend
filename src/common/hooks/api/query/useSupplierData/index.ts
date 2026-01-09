import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { supplyRegisterContract } from "@/common/lib/contract-addresses";

export const useSupplierDetails = (supplierAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["supplier", "details", supplierAddress],
    queryFn: async () => {
      if (!publicClient || !supplierAddress) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: supplyRegisterContract.address as `0x${string}`,
          abi: supplyRegisterContract.abi,
          functionName: "getSupplierDetails",
          args: [supplierAddress],
        });
        return result;
      } catch (error) {
        console.error("Failed to fetch supplier details:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient && !!supplierAddress,
    refetchInterval: 60000,
  });
};

export const useActiveSuppliers = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["supplier", "active"],
    queryFn: async () => {
      if (!publicClient) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: supplyRegisterContract.address as `0x${string}`,
          abi: supplyRegisterContract.abi,
          functionName: "getActiveSuppliers",
        });
        return result as `0x${string}`[];
      } catch (error) {
        console.error("Failed to fetch active suppliers:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 120000,
  });
};

export const useVerifiedSuppliers = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["supplier", "verified"],
    queryFn: async () => {
      if (!publicClient) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: supplyRegisterContract.address as `0x${string}`,
          abi: supplyRegisterContract.abi,
          functionName: "getVerifiedSuppliers",
        });
        return result as `0x${string}`[];
      } catch (error) {
        console.error("Failed to fetch verified suppliers:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 120000,
  });
};

export const useSupplierRatings = (supplierAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["supplier", "ratings", supplierAddress],
    queryFn: async () => {
      if (!publicClient || !supplierAddress) return [];
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: supplyRegisterContract.address as `0x${string}`,
          abi: supplyRegisterContract.abi,
          functionName: "getSupplierRatings",
          args: [supplierAddress],
        });
        return result as any[];
      } catch (error) {
        console.error("Failed to fetch supplier ratings:", error);
        return [];
      }
    },
    enabled: enabled && !!publicClient && !!supplierAddress,
    refetchInterval: 60000,
  });
};

export const useIsSupplierEligible = (supplierAddress: `0x${string}` | undefined, enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["supplier", "eligible", supplierAddress],
    queryFn: async () => {
      if (!publicClient || !supplierAddress) return false;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: supplyRegisterContract.address as `0x${string}`,
          abi: supplyRegisterContract.abi,
          functionName: "isSupplierEligible",
          args: [supplierAddress],
        });
        return result as boolean;
      } catch (error) {
        console.error("Failed to check supplier eligibility:", error);
        return false;
      }
    },
    enabled: enabled && !!publicClient && !!supplierAddress,
    refetchInterval: 60000,
  });
};

export const useGetTotalSuppliers = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["supplier", "total"],
    queryFn: async () => {
      if (!publicClient) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: supplyRegisterContract.address as `0x${string}`,
          abi: supplyRegisterContract.abi,
          functionName: "getTotalSuppliers",
        });
        return result as bigint;
      } catch (error) {
        console.error("Failed to fetch total suppliers:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 300000,
  });
};

export const useMinimumSupplierStake = (enabled = true) => {
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["supplier", "minimumStake"],
    queryFn: async () => {
      if (!publicClient) return null;
      try {
        const result = await publicClient.readContract({
          account: undefined,
          address: supplyRegisterContract.address as `0x${string}`,
          abi: supplyRegisterContract.abi,
          functionName: "minimumSupplierStake",
        });
        return result as bigint;
      } catch (error) {
        console.error("Failed to fetch minimum stake:", error);
        return null;
      }
    },
    enabled: enabled && !!publicClient,
    refetchInterval: 300000,
  });
};
