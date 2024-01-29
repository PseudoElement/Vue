import { BLOCKCHAIN_NAMES } from '../../../../../core/constants/blockchain-names';
import { ChainOption } from '../models/swap-form-types';

export const SELECT_SOURCE_CHAINS: ChainOption[] = [
    { text: 'Ethereum', value: BLOCKCHAIN_NAMES.ETHEREUM, isDisabled: false },
    { text: 'Arbitrum', value: BLOCKCHAIN_NAMES.ARBITRUM, isDisabled: false },
    { text: 'Binance Smart Chain', value: BLOCKCHAIN_NAMES.BNB, isDisabled: false },
    { text: 'Avalanche', value: BLOCKCHAIN_NAMES.AVALANCHE, isDisabled: false },
    { text: 'Linea', value: BLOCKCHAIN_NAMES.LINEA, isDisabled: false },
    { text: 'Optimism', value: BLOCKCHAIN_NAMES.OPTIMISM, isDisabled: false },
    { text: 'Polygon', value: BLOCKCHAIN_NAMES.POLYGON, isDisabled: false },
    { text: 'Scroll', value: BLOCKCHAIN_NAMES.SCROLL, isDisabled: false }
];

export const SELECT_TARGET_CHAINS: ChainOption[] = [
    { text: 'Ethereum', value: BLOCKCHAIN_NAMES.ETHEREUM, isDisabled: false },
    { text: 'Arbitrum', value: BLOCKCHAIN_NAMES.ARBITRUM, isDisabled: false },
    { text: 'Binance Smart Chain', value: BLOCKCHAIN_NAMES.BNB, isDisabled: false },
    { text: 'Avalanche', value: BLOCKCHAIN_NAMES.AVALANCHE, isDisabled: false },
    { text: 'Linea', value: BLOCKCHAIN_NAMES.LINEA, isDisabled: false },
    { text: 'Optimism', value: BLOCKCHAIN_NAMES.OPTIMISM, isDisabled: false },
    { text: 'Polygon', value: BLOCKCHAIN_NAMES.POLYGON, isDisabled: false },
    { text: 'Scroll', value: BLOCKCHAIN_NAMES.SCROLL, isDisabled: false }
];
