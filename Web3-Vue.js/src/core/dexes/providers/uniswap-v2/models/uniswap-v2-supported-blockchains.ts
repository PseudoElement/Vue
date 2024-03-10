import { BLOCKCHAIN_NAMES } from '../../../../constants/blockchain-names';

export const UNISWAP_V2_SUPPORTED_CHAINS = [BLOCKCHAIN_NAMES.ETHEREUM];

export type UniswapV2SupportedChain = (typeof UNISWAP_V2_SUPPORTED_CHAINS)[number];
