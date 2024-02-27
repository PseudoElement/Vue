export const BLOCKCHAIN_NAMES = {
    ETHEREUM: 'ETHEREUM',
    BNB: 'BNB',
    OPTIMISM: 'OPTIMISM',
    ARBITRUM: 'ARBITRUM',
    SCROLL: 'SCROLL',
    BASE: 'BASE',
    POLYGON: 'POLYGON',
    LINEA: 'LINEA',
    AVALANCHE: 'AVALANCHE',
    SEPOLIA: 'SEPOLIA'
} as const;

export type BlockchainName = (typeof BLOCKCHAIN_NAMES)[keyof typeof BLOCKCHAIN_NAMES];
