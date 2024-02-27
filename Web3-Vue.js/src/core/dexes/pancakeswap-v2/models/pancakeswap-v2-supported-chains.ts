import { BLOCKCHAIN_NAMES } from '@/src/core/constants/blockchain-names';

export const PANCAKESWAP_V2_SUPPORTED_CHAINS = [
    BLOCKCHAIN_NAMES.ETHEREUM,
    BLOCKCHAIN_NAMES.BNB,
    BLOCKCHAIN_NAMES.ARBITRUM,
    BLOCKCHAIN_NAMES.LINEA,
    BLOCKCHAIN_NAMES.BASE
];

export type PancakeSwapV2SupportedChain = (typeof PANCAKESWAP_V2_SUPPORTED_CHAINS)[number];
