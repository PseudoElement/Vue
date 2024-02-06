import { Store, useStore } from 'vuex';
import { StoreState } from '../store/models/store-types';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { ERC20_TOKEN_ABI } from '../constants/abi/erc20-token-abi';
import { TokenService } from './token-service';
import { BlockchainName } from '../constants/blockchain-names';
import { RPC_LIST } from '../constants/rpc-list';
import { AmountParser } from './amount-parser/amount-parser';

export class Web3Service {
    private _store: Store<StoreState>;

    private _web3: Web3;

    constructor() {
        this._store = useStore<StoreState>();
        this._web3 = this._store.state.appWeb3.web3 as Web3;
    }

    public connectWeb3(): void {
        this._store.commit('connectWeb3');
    }

    public async getBalance(walletAddress: string, tokenAddress: string, blockchain: BlockchainName): Promise<BigNumber> {
        const balance = TokenService.isNative(tokenAddress)
            ? await this._getNativeBalance(walletAddress)
            : await this._getNotNativeBalance(walletAddress, tokenAddress, blockchain);

        return balance;
    }

    private async _getNativeBalance(walletAddress: string): Promise<BigNumber> {
        const weiAmount = await this._web3.eth.getBalance(walletAddress);
        const amount = this._web3.utils.fromWei(weiAmount, 'ether');

        return new BigNumber(amount);
    }

    private async _getNotNativeBalance(walletAddress: string, tokenAddress: string, blockchain: BlockchainName): Promise<BigNumber> {
        try {
            const web3 = new Web3(new Web3.providers.HttpProvider(RPC_LIST[blockchain]));
            const contract = new web3.eth.Contract(ERC20_TOKEN_ABI, tokenAddress);
            const [weiAmount, decimals] = (await Promise.all([
                contract.methods.balanceOf(walletAddress).call(),
                contract.methods.decimals().call()
            ])) as [string, number];
            const amount = AmountParser.fromWei(weiAmount, decimals);

            return new BigNumber(amount);
        } catch (err) {
            throw new Error(('[GET_BALANCE_NOT_NATIVE]' + err) as string);
        }
    }
}
