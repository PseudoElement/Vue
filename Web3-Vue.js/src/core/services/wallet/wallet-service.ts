import { RPC_LIST } from '../../constants/rpc-list';
import { Utils } from '../../utils/utils';
import BigNumber from 'bignumber.js';
import { Injector } from '../injector/injector';

export class WalletService {
    public static connectWeb3(): void {
        Injector.storeCommit('connectWeb3');
    }

    public static async connectWallet(): Promise<void> {
        await Injector.storeDispatch('connectWallet');
        const isConnectedWallet = Injector.storeState.wallet.isConnected;

        if (isConnectedWallet) {
            this.setChainId();
            this._onConnectWallet();
        }
    }

    public static disconnectWallet(): void {
        Injector.storeDispatch('disconnectWallet');
        this._onDisconnectWallet();
    }

    public static setChainId(): void {
        Injector.storeDispatch('setChainId');
    }

    public static async switchChain(chainId: number): Promise<void> {
        await Injector.storeDispatch('switchChain', chainId);
    }

    private static _onConnectWallet(): void {
        this._listenAccountChanges();
        this._listenChainChanges();
    }

    private static _onDisconnectWallet(): void {
        window.ethereum?.removeAllListeners();
    }

    private static _listenAccountChanges(): void {
        window.ethereum?.on('accountsChanged', (accounts: any) => {
            Injector.storeCommit('setWalletAddress', accounts[0] ?? null);
        });
    }

    private static _listenChainChanges(): void {
        window.ethereum?.on('chainChanged', (chainId: any) => {
            Injector.storeCommit('setChainId', chainId);

            const blockchainName = Utils.getChainNameById(new BigNumber(chainId).toNumber());
            Injector.storeCommit('changeWeb3Provider', RPC_LIST[blockchainName]);
            setTimeout(() => console.log(Injector.web3.currentProvider), 1000);
        });
    }
}
