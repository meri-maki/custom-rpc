
import { http, createConfig, fallback, unstable_connector } from 'wagmi'
import { bsc, mainnet, sepolia } from 'wagmi/chains'
import {  injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia,bsc],
  connectors: [
    injected(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: fallback([
            unstable_connector(injected),
            http(`https://bsc-rpc.publicnode.com`),
            http(`https://bsc-dataseed.binance.org`),
            http(`https://bsc-dataseed1.defibit.io`),
            http(`https://bsc-dataseed1.ninicoin.io`),
            http(`https://bsc-dataseed2.defibit.io`),
            http(`https://bsc-dataseed3.defibit.io`),
            http(`https://bsc-dataseed4.defibit.io`),
            http(`https://bsc-dataseed2.ninicoin.io`),
            http(`https://bsc-dataseed3.ninicoin.io`),
            http("https://bsc-dataseed1.binance.org/"),
            http("https://bsc-dataseed2.binance.org/"),
            http("https://bsc-dataseed4.ninicoin.io/"),
            http("https://bsc-rpc.publicnode.com")
        ]),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
