import { SwapFormActions } from './actions';
import type { SwapFormState } from './model';
import { SwapFormMutations } from './mutations';

export const SwapFormModule = {
    state: (): SwapFormState => ({
        from: {
            blockchain: null,
            address: null,
            token: null,
            decimals: null,
            amount: null
        },
        to: {
            blockchain: null,
            address: null,
            token: null,
            decimals: null,
            amount: null
        }
    }),
    mutations: SwapFormMutations,
    actions: SwapFormActions
};
