import { Store, useStore } from 'vuex';
import type { StoreState } from '../../store/models/store-types';

export class WalletService {
    private _store: Store<StoreState>;

    constructor() {
        this._store = useStore<StoreState>();
    }

    public connectWeb3(): void {
        this._store.commit('connectWeb3');
    }

    public async connectWallet(): Promise<void> {
        await this._store.dispatch('connectWallet');
        const isConnectedWallet = this._store.state.wallet.isConnected;

        if (isConnectedWallet) {
            this.setChainId();
            this._onConnectWallet();
        }
    }

    public disconnectWallet(): void {
        this._store.dispatch('disconnectWallet');
        this._onDisconnectWallet();
    }

    public setChainId(): void {
        this._store.dispatch('setChainId');
    }

    public async switchChain(chainId: number): Promise<void> {
        await this._store.dispatch('switchChain', chainId);
    }

    private _onConnectWallet(): void {
        this._listenAccountChanges();
        this._listenChainChanges();
    }

    private _onDisconnectWallet(): void {
        window.ethereum?.removeAllListeners();
    }

    private _listenAccountChanges(): void {
        window.ethereum?.on('accountsChanged', (accounts: any) => {
            this._store.commit('setWalletAddress', accounts[0] ?? null);
        });
    }

    private _listenChainChanges(): void {
        window.ethereum?.on('chainChanged', (chainId: any) => {
            this._store.commit('setChainId', chainId);
        });
    }
}
