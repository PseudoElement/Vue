import BigNumber from 'bignumber.js';
import Web3 from 'web3';

export class WalletApiService {
    private static web3: Web3 = new Web3(window.ethereum);

    public static switchChain(chainId: number): void {
        return window.ethereum?.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: this.web3.utils.toHex(chainId) }]
        }) as void;
    }

    public static async getChainId(): Promise<number> {
        const hexChainId = (await window.ethereum?.request({
            method: 'eth_chainId'
        })) as unknown as string;

        return new BigNumber(hexChainId).toNumber();
    }

    public static async getWalletAddress(): Promise<string | null> {
        const accounts = (await window.ethereum?.request({
            method: 'eth_requestAccounts'
        })) as string[];
        const address = accounts?.[0] || null;

        return address;
    }
}
