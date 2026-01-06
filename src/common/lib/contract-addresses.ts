import { CollateralAbi } from "../abi/collateralAbi";
import { configurationAbi } from "../abi/configurationAbi";
import { fiatLoanBridge } from "../abi/FiatLoanAbi";
import { loanMarketPlaceAbi } from "../abi/loanMarketPlace";
import { supplierRegistry } from "../abi/supplyRegistry";

export const loanMarketPlaceContract = {
  address: process.env["NEXT_PUBLIC_LOANMARKETPLACE_ADDRESS"]!,
  abi: loanMarketPlaceAbi,
};

export const collateralContract = {
  address: process.env["NEXT_PUBLIC_COLLATERALESCROW_ADDRESS"]!,
  abi: CollateralAbi,
};

export const fiatLoanBridgeContract = {
  address: process.env["NEXT_PUBLIC_FIATLOANBRIDGE_ADDRESS"]!,
  abi: fiatLoanBridge,
};

export const supplyRegisterContract = {
  address: process.env["NEXT_PUBLIC_SUPPLIERREGISTRY_ADDRESS"]!,
  abi: supplierRegistry,
};

export const configurationContract = {
  address: process.env["NEXT_PUBLIC_CONFIGURACTION_ADDRESS"]!,
  abi: configurationAbi,
};
