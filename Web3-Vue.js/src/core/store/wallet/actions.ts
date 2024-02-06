import type { ActionContext } from 'vuex';
import type { WalletState } from './model';
import type { StoreState } from '../models/store-types';
import { WalletApiService } from '../../services/wallet/wallet-api-service';

export const WalletActions = {
    async connectWallet(ctx: ActionContext<WalletState, StoreState>) {
        if (window === undefined || typeof window.ethereum === 'undefined') {
            throw new Error('Install Metamask extension in browser, then retry to connect!');
        }
        const address = await WalletApiService.getWalletAddress();

        ctx.commit('connectWallet', address);
        ctx.dispatch('setChainId');
    },

    disconnectWallet(ctx: ActionContext<WalletState, StoreState>) {
        ctx.commit('disconnectWallet');
        ctx.commit('setChainId', null);
    },

    async setChainId(ctx: ActionContext<WalletState, StoreState>) {
        const chainId = await WalletApiService.getChainId();

        ctx.commit('setChainId', chainId);
    },

    async switchChain(ctx: ActionContext<WalletState, StoreState>, chainId: number) {
        await WalletApiService.switchChain(chainId);

        ctx.commit('setChainId', chainId);
    }
};

export type WalletActionsType = keyof typeof WalletActions;
