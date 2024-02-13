import { FMT_BYTES, FMT_NUMBER } from 'web3';

export const GAS_CONFIG = { number: FMT_NUMBER.NUMBER, bytes: FMT_BYTES.HEX } as const;
export const GAS_PRICE_CONFIG = { number: FMT_NUMBER.HEX, bytes: FMT_BYTES.HEX } as const;
