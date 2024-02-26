import { AbstractOnChainTrade } from '../../dexes/abstract/abstract-dex-trade';

export interface TradeState {
    selectedTrade: AbstractOnChainTrade | null;
    trades: AbstractOnChainTrade[];
}
