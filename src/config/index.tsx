import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { polygon } from "@alchemy/aa-core";


export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
    name: 'Your Crypto Bank',
    description: 'Safe haven Defi And Wallet',
    url: '', // origin must match your domain & subdomain
    icons: ['']
}

// Create wagmiConfig
export const chains = [polygon] as const

export function isSupportedChain(id?: number) {
    return chains.some(chain => chain.id === id);
}

export function getSupportedChain(id?: number) {
    return chains.find((cc) => { cc.id === id });
}

export const configWagmiCustom = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    enableEmail: true,
})
