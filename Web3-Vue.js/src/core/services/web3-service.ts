import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { ERC20_TOKEN_ABI } from '../constants/abi/erc20-token-abi';
import { TokenService } from './token-service';
import { BlockchainName } from '../constants/blockchain-names';
import { RPC_LIST } from '../constants/rpc-list';
import { AmountParser } from './amount-parser/amount-parser';
import { AppContractAbi } from './swap/models/swap-types';

export class Web3Service {
    public static encodeTxData(abi: AppContractAbi, methodName: string, methodArgs: string[]): string {
        const web3 = new Web3();
        const found = abi.find((a) => a.name === methodName);

        if (!found) {
            throw new Error(`Abi method not found!`);
        }
        const data = web3.eth.abi.encodeFunctionCall(found, methodArgs);

        return data;
    }

    public static async getBalance(walletAddress: string, tokenAddress: string, blockchain: BlockchainName): Promise<BigNumber> {
        const balance = TokenService.isNative(tokenAddress)
            ? await this._getNativeBalance(walletAddress)
            : await this._getNotNativeBalance(walletAddress, tokenAddress, blockchain);

        return balance;
    }

    public static async getDecimals(blockchain: BlockchainName, tokenAddress: string): Promise<number> {
        const web3 = new Web3(new Web3.providers.HttpProvider(RPC_LIST[blockchain]));
        const contract = new web3.eth.Contract(ERC20_TOKEN_ABI, tokenAddress);
        const decimals = (await contract.methods.decimals().call()) as number;

        return new BigNumber(decimals).toNumber();
    }

    private static async _getNativeBalance(walletAddress: string): Promise<BigNumber> {
        const web3 = new Web3(window.ethereum);
        const weiAmount = await web3.eth.getBalance(walletAddress);
        const amount = web3.utils.fromWei(weiAmount, 'ether');

        return new BigNumber(amount);
    }

    private static async _getNotNativeBalance(walletAddress: string, tokenAddress: string, blockchain: BlockchainName): Promise<BigNumber> {
        try {
            const web3 = new Web3(new Web3.providers.HttpProvider(RPC_LIST[blockchain]));
            const contract = new web3.eth.Contract(ERC20_TOKEN_ABI, tokenAddress);
            const [weiAmount, decimals] = (await Promise.all([
                contract.methods.balanceOf(walletAddress).call(),
                this.getDecimals(blockchain, tokenAddress)
            ])) as [string, number];
            const amount = AmountParser.fromWei(weiAmount, decimals);

            return new BigNumber(amount);
        } catch (err) {
            throw new Error(('[GET_BALANCE_NOT_NATIVE]' + err) as string);
        }
    }
}
