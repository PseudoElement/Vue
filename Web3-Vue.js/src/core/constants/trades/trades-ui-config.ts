import { ON_CHAIN_PROVIDER, OnChainProviderType } from '../../dexes/models/on-chain-provider-type';

interface TradeUIConfig {
    label: string;
    icon: string;
    rank: number;
    bgColor: string;
}

const path = '../../../../assets/providers/';

export const TRADES_UI_CONFIG: Record<OnChainProviderType, TradeUIConfig> = {
    [ON_CHAIN_PROVIDER.PANCAKESWAP_V2]: {
        icon: `${path}pancakeswap.svg`,
        label: 'PancakeSwapV2',
        rank: 5,
        bgColor: '#30ccd1'
    },
    [ON_CHAIN_PROVIDER.UNISWAP_V2]: {
        icon: `${path}uniswap-2.svg`,
        label: 'UniswapV2',
        rank: 5,
        bgColor: '#fcd4ee'
    }
} as const;
