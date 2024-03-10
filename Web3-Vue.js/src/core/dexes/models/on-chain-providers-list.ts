import { OneInchTrade } from '../providers/1inch/1inch-trade';
import { PancakeSwapV2Trade } from '../providers/pancakeswap-v2/pancakeswap-v2-trade';
import { UniswapV2Trade } from '../providers/uniswap-v2/uniswap-v2-trade';

export const ON_CHAIN_PROVIDERS_VIA_CONTRACT_SEND = [UniswapV2Trade, PancakeSwapV2Trade] as const;

export const ON_CHAIN_PROVIDERS_VIA_SEND_TX = [OneInchTrade] as const;

export const ON_CHAIN_PROVIDERS = [...ON_CHAIN_PROVIDERS_VIA_CONTRACT_SEND, ...ON_CHAIN_PROVIDERS_VIA_SEND_TX] as const;
