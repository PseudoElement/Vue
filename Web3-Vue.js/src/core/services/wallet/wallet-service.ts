import { Store, useStore } from 'vuex';
import type { StoreState } from '../../store/models/store-types';
import { RPC_LIST } from '../../constants/rpc-list';
import { Utils } from '../../utils/utils';
import BigNumber from 'bignumber.js';
import { appCommit, appDispatch } from '../../store/store';

export class WalletService {
    private _store: Store<StoreState>;

    constructor() {
        this._store = useStore<StoreState>();
    }

    public connectWeb3(): void {
        appCommit('connectWeb3');
    }

    public async connectWallet(): Promise<void> {
        await appDispatch('connectWallet');
        const isConnectedWallet = this._store.state.wallet.isConnected;

        if (isConnectedWallet) {
            this.setChainId();
            this._onConnectWallet();
        }
    }

    public disconnectWallet(): void {
        appDispatch('disconnectWallet');
        this._onDisconnectWallet();
    }

    public setChainId(): void {
        appDispatch('setChainId');
    }

    public async switchChain(chainId: number): Promise<void> {
        await appDispatch('switchChain', chainId);
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
            appCommit('setWalletAddress', accounts[0] ?? null);
        });
    }

    private _listenChainChanges(): void {
        window.ethereum?.on('chainChanged', (chainId: any) => {
            appCommit('setChainId', chainId);

            const blockchainName = Utils.getChainNameById(new BigNumber(chainId).toNumber());
            appCommit('changeWeb3Provider', RPC_LIST[blockchainName]);
        });
    }
}
