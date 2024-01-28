export const BLOCKCHAIN_NAMES = {
    ETHEREUM: 'ETHEREUM',
    BNB: 'BNB',
    OPTIMISM: 'OPTIMISM',
    ARBITRUM: 'ARBITRUM',
    SCROLL: 'SCROLL',
    POLYGON: 'POLYGON',
    LINEA: 'LINEA',
    AVALANCHE: 'AVALANCHE'
} as const;

export type BlockchainName = (typeof BLOCKCHAIN_NAMES)[keyof typeof BLOCKCHAIN_NAMES];
