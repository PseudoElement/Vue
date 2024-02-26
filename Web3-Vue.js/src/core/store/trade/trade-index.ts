import { TradeState } from './trade-model';
import { TradeMutations } from './trade-mutations';

export const TradeModule = {
    state: (): TradeState => ({
        selectedTrade: null,
        trades: []
    }),
    mutations: TradeMutations
};
