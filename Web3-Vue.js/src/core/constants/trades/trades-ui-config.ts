import { ON_CHAIN_PROVIDER, OnChainProviderType } from '../../dexes/models/on-chain-provider-type';
import UniswapV2SVG from '../../../assets/providers/uniswap-2.svg';
import PancakeSwapV2SVG from '../../../assets/providers/pancakeswap.svg';
import OneInchSVG from '../../../assets/providers/1inch.svg';

interface TradeUIConfig {
    label: string;
    icon: string;
    rank: number;
    bgColor: string;
}

export const TRADES_UI_CONFIG: Record<OnChainProviderType, TradeUIConfig> = {
    [ON_CHAIN_PROVIDER.PANCAKESWAP_V2]: {
        icon: PancakeSwapV2SVG,
        label: 'PancakeSwapV2',
        rank: 5,
        bgColor: '#cbf7f7'
    },
    [ON_CHAIN_PROVIDER.UNISWAP_V2]: {
        icon: UniswapV2SVG,
        label: 'UniswapV2',
        rank: 5,
        bgColor: '#fcd4ee'
    },
    [ON_CHAIN_PROVIDER['1INCH']]: {
        icon: OneInchSVG,
        label: '1inch',
        rank: 5,
        bgColor: '#78a6f5'
    }
} as const;
