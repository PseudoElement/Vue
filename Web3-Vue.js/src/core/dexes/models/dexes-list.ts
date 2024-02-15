export const DEXES = {
    UNISWAP_V2: 'UNISWAP_V2'
} as const;

export type DexType = (typeof DEXES)[keyof typeof DEXES];
