export const WALLETS = {
    METAMASK: 'METAMASK',
    ARGENT: 'ARGENT',
    BITKEEP: 'BITKEEP'
} as const;

export type WalletType = (typeof WALLETS)[keyof typeof WALLETS];
