import { BLOCKCHAIN_NAMES } from '@/src/core/constants/blockchain-names';

export const UNISWAP_V2_SUPPORTED_CHAINS = [BLOCKCHAIN_NAMES.ETHEREUM, BLOCKCHAIN_NAMES.POLYGON, BLOCKCHAIN_NAMES.BNB] as const;

export type UniswapV2SupportedChain = (typeof UNISWAP_V2_SUPPORTED_CHAINS)[number];
