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
    setWalletAddress(state: WalletState, walletAddress: string): void {
        state.address = walletAddress;
    },
    setChainId(state: WalletState, chainId: number | string): void {
        if (typeof chainId == 'number') {
            state.chainId = chainId;
        } else {
            state.chainId = new BigNumber(chainId).toNumber();
        }
    }
};

export type WalletMutationsType = keyof typeof WalletMutations;
