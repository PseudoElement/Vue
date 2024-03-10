import { AbstractOnChainTrade } from '../../abstract/abstract-on-chain-trade';

export interface ResolvedTrade {
    isActive: boolean;
    trade: AbstractOnChainTrade;
}
