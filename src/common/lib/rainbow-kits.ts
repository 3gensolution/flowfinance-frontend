'use client';
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { createConfig, http } from "wagmi";

export const config = getDefaultConfig({
  appName: "Flow Finance",
  projectId: process.env["NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID"]!,
  chains: [sepolia],
  ssr: true,
  wallets: undefined,
});

export const userConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
