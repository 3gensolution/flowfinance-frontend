import { createPublicClient, http } from 'viem'
import { baseSepolia } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(`${process.env["NEXT_PUBLIC_SEPOLIA_RPC_URL"]}`)
  // transport: fallback([
  //   http('https://rpc.sepolia.org'),
  //   http(`${process.env["NEXT_PUBLIC_SEPOLIA_RPC_URL"]}`),
  //   http('https://rpc.ankr.com/eth_sepolia')
  // ])
})
