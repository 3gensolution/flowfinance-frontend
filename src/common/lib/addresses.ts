import { getAddress, zeroAddress } from "viem";
// --------------------
// Token Addresses
// --------------------
export const TOKEN_ADDRESSES = {
  USDC: getAddress(process.env["NEXT_PUBLIC_USDC_ADDRESS"]!),
  DAI: getAddress(process.env["NEXT_PUBLIC_DAI_ADDRESS"]!),
  WETH: getAddress(process.env["NEXT_PUBLIC_WETH_ADDRESS"]!),
  WBTC: getAddress(process.env["NEXT_PUBLIC_WBTC_ADDRESS"]!),
} as const;

// --------------------
// Contract Addresses
// --------------------
export const CONTRACT_ADDRESSES = {
  LOAN_MARKETPLACE: getAddress(process.env["NEXT_PUBLIC_LOANMARKETPLACE_ADDRESS"]!),
  COLLATERAL_ESCROW: getAddress(process.env["NEXT_PUBLIC_COLLATERALESCROW_ADDRESS"]!),
  FIAT_LOAN_BRIDGE: getAddress(process.env["NEXT_PUBLIC_FIATLOANBRIDGE_ADDRESS"]!),
  SUPPLIER_REGISTRY: getAddress(process.env["NEXT_PUBLIC_SUPPLIERREGISTRY_ADDRESS"]!),
  CONFIGURATION: getAddress(process.env["NEXT_PUBLIC_CONFIGURATION_ADDRESS"]!),
} as const;

// --------------------
// Address validation utility
// --------------------
export const isValidAddress = (address: string): boolean => {
  return address !== zeroAddress;
};

// --------------------
// Debug helper
// --------------------
export const getAddressStatus = () => ({
  tokens: Object.fromEntries(
    Object.entries(TOKEN_ADDRESSES).map(([key, address]) => [
      key,
      { address, valid: isValidAddress(address) },
    ])
  ),
  contracts: Object.fromEntries(
    Object.entries(CONTRACT_ADDRESSES).map(([key, address]) => [
      key,
      { address, valid: isValidAddress(address) },
    ])
  ),
});
