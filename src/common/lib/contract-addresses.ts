import { CollateralAbi } from "../abi/collateralAbi";
import { configurationAbi } from "../abi/configurationAbi";
import { fiatLoanBridge } from "../abi/FiatLoanAbi";
import { loanMarketPlaceAbi } from "../abi/loanMarketPlace";
import { supplierRegistry } from "../abi/supplyRegistry";
import { CONTRACT_ADDRESSES } from "./addresses";

export const loanMarketPlaceContract = {
  address: CONTRACT_ADDRESSES.LOAN_MARKETPLACE,
  abi: loanMarketPlaceAbi,
};

export const collateralContract = {
  address: CONTRACT_ADDRESSES.COLLATERAL_ESCROW,
  abi: CollateralAbi,
};

export const fiatLoanBridgeContract = {
  address: CONTRACT_ADDRESSES.FIAT_LOAN_BRIDGE,
  abi: fiatLoanBridge,
};

export const supplyRegisterContract = {
  address: CONTRACT_ADDRESSES.SUPPLIER_REGISTRY,
  abi: supplierRegistry,
};

export const configurationContract = {
  address: CONTRACT_ADDRESSES.CONFIGURATION,
  abi: configurationAbi,
};
