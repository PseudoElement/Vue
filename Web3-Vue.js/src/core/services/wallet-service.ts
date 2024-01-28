import { Store, useStore } from 'vuex';
import type { StoreState } from '../store/models/store-types';

export class WalletService {
    private _store: Store<StoreState>;

    constructor() {
        this._store = useStore<StoreState>();
    }

    public connectWallet(): void {
        this._store.dispatch('connectWallet');
    }

    public disconnectWallet(): void {
        this._store.dispatch('disconnectWallet');
    }

    public setChainId(): void {
        this._store.dispatch('setChainId');
    }

    public listenAccountChanges(): void {
        window.ethereum?.on('accountsChanged', (accounts: any) => {
            this._store.commit('setWalletAddress', accounts[0] ?? null);
        });
    }

    public listenChainChanges(): void {
        window.ethereum?.on('chainChanged', (chainId: any) => {
            (this._store || useStore()).commit('setChainId', chainId);
        });
    }

    public onConnect(): void {
        window.ethereum?.on('connect', (connectInfo: any) => {
            console.log('onConnect', connectInfo);
        });
    }
}
