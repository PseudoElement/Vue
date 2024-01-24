import type { WalletState } from './model';
import { WalletMutations } from './mutations';

export const walletModule = {
    state: () => ({
        address: null,
        type: null
    }),
    mutations: {
        [WalletMutations.SET_WALLET_ADDRESS](state: WalletState, address: string) {
            state.address = address;
        }
    }
};
