import BigNumber from 'bignumber.js';
import type { WalletState } from './model';

export const WalletMutations = {
    setWalletAddress(state: WalletState, address: string): void {
        state.address = address;
    },
    setChainId(state: WalletState, chainId: string | null): void {
        if (chainId) {
            const numberId = new BigNumber(chainId).toNumber();
            state.chainId = numberId;
        } else {
            state.chainId = null;
        }
    }
};

export type WalletMutationsType = keyof typeof WalletMutations;
