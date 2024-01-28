import { WalletActions } from './actions';
import { WalletMutations } from './mutations';

export const WalletModule = {
    state: () => ({
        address: null,
        type: null,
        chainId: null
    }),
    mutations: WalletMutations,
    actions: WalletActions,
    getters: {}
};
