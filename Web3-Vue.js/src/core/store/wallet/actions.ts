import type { ActionContext } from 'vuex';
import type { WalletState } from './model';
import type { StoreState } from '../models/store-types';
import Web3 from 'web3';

export const WalletActions = {
    async connectWallet(ctx: ActionContext<WalletState, StoreState>) {
        if (window === undefined || typeof window.ethereum === 'undefined') {
            throw new Error('Install Metamask extension in browser, then retry to connect!');
        }

        const accounts = (await window.ethereum.request({
            method: 'eth_requestAccounts'
        })) as string[];
        const address = accounts?.[0] || null;

        ctx.commit('connectWallet', address);
        ctx.dispatch('setChainId');
    },

    disconnectWallet(ctx: ActionContext<WalletState, StoreState>) {
        ctx.commit('disconnectWallet');
        ctx.commit('setChainId', null);
    },

    async setChainId(ctx: ActionContext<WalletState, StoreState>) {
        const chainId = (await window.ethereum?.request({
            method: 'eth_chainId'
        })) as string;

        ctx.commit('setChainId', chainId);
    },

    async switchChain(ctx: ActionContext<WalletState, StoreState>, chainId: number) {
        const web3 = ctx.rootState.appWeb3.web3 as Web3;
        await window.ethereum?.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: web3.utils.toHex(chainId) }]
        });

        ctx.commit('setChainId', chainId);
    }
};

export type WalletActionsType = keyof typeof WalletActions;
