export * from "./routes";

import { TOKEN_ADDRESSES } from "@/common/lib/addresses";

// Token Assets Configuration
export const TOKEN_ASSETS = {
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    address: TOKEN_ADDRESSES.USDC,
  },
  DAI: {
    symbol: "DAI",
    name: "Dai Stablecoin",
    decimals: 18,
    address: TOKEN_ADDRESSES.DAI,
  },
  WETH: {
    symbol: "WETH",
    name: "Wrapped Ether",
    decimals: 18,
    address: TOKEN_ADDRESSES.WETH,
  },
  WBTC: {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    decimals: 8,
    address: TOKEN_ADDRESSES.WBTC,
  },
} as const;

export type TokenSymbol = keyof typeof TOKEN_ASSETS;

export const getTokenByAddress = (address: `0x${string}`): (typeof TOKEN_ASSETS)[TokenSymbol] | null => {
  const key = Object.keys(TOKEN_ASSETS).find(
    (k) => TOKEN_ASSETS[k as TokenSymbol].address.toLowerCase() === address.toLowerCase()
  ) as TokenSymbol | undefined;
  return key ? TOKEN_ASSETS[key] : null;
};

export const getTokenBySymbol = (symbol: string): (typeof TOKEN_ASSETS)[TokenSymbol] | null => {
  const key = symbol.toUpperCase() as TokenSymbol;
  return key in TOKEN_ASSETS ? TOKEN_ASSETS[key] : null;
};

