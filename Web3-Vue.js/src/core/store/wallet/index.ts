import { WalletActions } from './actions';
import type { WalletState } from './model';
import { WalletMutations } from './mutations';

export const WalletModule = {
    state: (): WalletState => ({
        address: null,
        type: null,
        chainId: null,
        balance: null,
        isConnected: false
    }),
    mutations: WalletMutations,
    actions: WalletActions,
    getters: {}
};
