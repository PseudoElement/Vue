export const TOKEN_NAMES = {
    ETH: 'ETH',
    BNB: 'BNB',
    USDC: 'USDC',
    USDT: 'USDT',
    MATIC: 'MATIC',
    AVAX: 'AVAX'
} as const;

export type TokenName = (typeof TOKEN_NAMES)[keyof typeof TOKEN_NAMES];
