import { BLOCKCHAIN_NAMES } from '../../constants/blockchain-names';
import type { SwapFormState } from './model';
import { SwapFormMutations } from './mutations';

export const SwapFormModule = {
    state: (): SwapFormState => ({
        from: {
            blockchain: BLOCKCHAIN_NAMES.ETHEREUM,
            address: null,
            token: null
        },
        to: {
            blockchain: BLOCKCHAIN_NAMES.ETHEREUM,
            address: null,
            token: null
        }
    }),
    mutations: SwapFormMutations,
    actions: {}
};
