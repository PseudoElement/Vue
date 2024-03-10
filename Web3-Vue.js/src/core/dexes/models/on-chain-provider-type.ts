export const ON_CHAIN_PROVIDER = {
    UNISWAP_V2: 'UNISWAP_V2',
    PANCAKESWAP_V2: 'PANCAKESWAP_V2',
    '1INCH': '1INCH'
} as const;

export type OnChainProviderType = (typeof ON_CHAIN_PROVIDER)[keyof typeof ON_CHAIN_PROVIDER];
