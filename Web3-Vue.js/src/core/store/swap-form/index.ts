import BigNumber from 'bignumber.js';
import { SwapFormActions } from './actions';
import type { SwapFormState } from './model';
import { SwapFormMutations } from './mutations';

export const SwapFormModule = {
    state: (): SwapFormState => ({
        from: {
            blockchain: null,
            address: null,
            symbol: null,
            decimals: null,
            amount: new BigNumber(0)
        },
        to: {
            blockchain: null,
            address: null,
            symbol: null,
            decimals: null,
            amount: new BigNumber(0)
        }
    }),
    mutations: SwapFormMutations,
    actions: SwapFormActions
};
