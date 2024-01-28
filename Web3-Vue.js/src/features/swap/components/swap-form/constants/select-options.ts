import { TOKEN_NAMES } from '../../../../../core/constants/token-names';
import { BLOCKCHAIN_NAMES } from '../../../../../core/constants/blockchain-names';
import { SelectOption } from '@/src/shared/inputs/input-select/model';

export const SELECT_SOURCE_CHAINS: SelectOption[] = [
    { text: 'Ethereum', value: BLOCKCHAIN_NAMES.ETHEREUM, isDisabled: false },
    { text: 'Arbitrum', value: BLOCKCHAIN_NAMES.ARBITRUM, isDisabled: false },
    { text: 'Binance Smart Chain', value: BLOCKCHAIN_NAMES.BNB, isDisabled: false },
    { text: 'Avalanche', value: BLOCKCHAIN_NAMES.AVALANCHE, isDisabled: false },
    { text: 'Linea', value: BLOCKCHAIN_NAMES.LINEA, isDisabled: false },
    { text: 'Optimism', value: BLOCKCHAIN_NAMES.OPTIMISM, isDisabled: false },
    { text: 'Polygon', value: BLOCKCHAIN_NAMES.POLYGON, isDisabled: false },
    { text: 'Scroll', value: BLOCKCHAIN_NAMES.SCROLL, isDisabled: false }
];

export const SELECT_SOURCE_TOKENS: SelectOption[] = [
    { text: TOKEN_NAMES.ETH, value: TOKEN_NAMES.ETH, isDisabled: false },
    { text: TOKEN_NAMES.AVAX, value: TOKEN_NAMES.AVAX, isDisabled: false },
    { text: TOKEN_NAMES.BNB, value: TOKEN_NAMES.BNB, isDisabled: false },
    { text: TOKEN_NAMES.MATIC, value: TOKEN_NAMES.MATIC, isDisabled: false },
    { text: TOKEN_NAMES.USDC, value: TOKEN_NAMES.USDC, isDisabled: false },
    { text: TOKEN_NAMES.USDT, value: TOKEN_NAMES.USDT, isDisabled: false }
];
