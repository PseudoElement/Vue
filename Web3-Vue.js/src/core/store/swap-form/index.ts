import type { SwapFormState } from './model';
import { SwapFormMutations } from './mutations';

export const SwapFormModule = {
    state: (): SwapFormState => ({
        from: {
            blockchain: null,
            address: null,
            token: null
        },
        to: {
            blockchain: null,
            address: null,
            token: null
        }
    }),
    mutations: SwapFormMutations,
    actions: {}
};
