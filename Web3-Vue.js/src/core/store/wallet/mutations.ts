import BigNumber from 'bignumber.js';
import type { WalletState } from './model';

export const WalletMutations = {
    connectWallet(state: WalletState, address: string): void {
        state.address = address;
        state.isConnected = true;
    },
    disconnectWallet(state: WalletState): void {
        state.address = null;
        state.chainId = null;
        state.isConnected = false;
    },
    setChainId(state: WalletState, chainId: string | number): void {
        const numberId = new BigNumber(chainId).toNumber();
        state.chainId = numberId;
    }
};

export type WalletMutationsType = keyof typeof WalletMutations;
