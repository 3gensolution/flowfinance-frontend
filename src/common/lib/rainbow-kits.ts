'use client';
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";
import { createConfig, http } from "wagmi";

export const config = getDefaultConfig({
  appName: "Flow Finance",
  projectId: process.env["NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID"]!,
  chains: [baseSepolia],
  ssr: true,
  wallets: undefined,
});

export const userConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});
