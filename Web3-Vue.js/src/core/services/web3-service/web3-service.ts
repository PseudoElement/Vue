import BigNumber from 'bignumber.js';
import { ERC20_TOKEN_ABI } from '../../constants/abi/erc20-token-abi';
import { TokenService } from '../token-service';
import { AmountParser } from '../amount-parser/amount-parser';
import { AppContractAbi } from '../swap/models/swap-types';
import { TxParams, GetTxObjectParams, EstimateGasParams, AppTxReceipt } from './models/web3-service-types';
import { GAS_CONFIG, GAS_PRICE_CONFIG } from './constants/gas-config';
import { Injector } from '../injector/injector';

export class Web3Service {
    public static async getTxParams({ contractAddress, data, value }: GetTxObjectParams): Promise<TxParams> {
        const walletAddress = Injector.walletAddress || '';
        const gas = await this.estimateEthGas({ from: walletAddress, to: walletAddress, data, value });
        const gasPrice = await this.getGasPrice();

        return {
            data,
            toAddress: contractAddress,
            value: value,
            gas: AmountParser.stringifyAmount(gas, 1.05),
            gasPrice: AmountParser.stringifyAmount(gasPrice),
            fromAddress: walletAddress
        };
    }

    public static encodeTxData(abi: AppContractAbi, methodName: string, methodArgs: any[]): string {
        const found = abi.find((a) => a.name === methodName);

        if (!found) {
            throw new Error(`Abi method not found!`);
        }
        const data = Injector.web3.eth.abi.encodeFunctionCall(found, methodArgs);

        return data;
    }

    public static async isTxApproved(amount: BigNumber, tokenAddress: string, contractAddress: string): Promise<boolean> {
        try {
            const needApprove = await this.needApprove(amount, tokenAddress, contractAddress);
            if (!needApprove) return true;
            const approved = await this.approve(tokenAddress, contractAddress);

            return approved;
        } catch (err) {
            return false;
        }
    }

    private static async needApprove(amount: BigNumber, tokenAddress: string, contractAddress: string): Promise<boolean> {
        try {
            const contract = new Injector.web3.eth.Contract(ERC20_TOKEN_ABI, tokenAddress);
            const allowance = await contract.methods.allowance(Injector.walletAddress, contractAddress).call();

            return amount.gt(allowance.toString());
        } catch (err) {
            return true;
        }
    }

    private static async approve(tokenAddress: string, contractAddress: string): Promise<boolean> {
        try {
            const contract = new Injector.web3Eth.eth.Contract(ERC20_TOKEN_ABI, tokenAddress);
            const approvedAmount = new BigNumber(2).pow(256).minus(1).toFixed(0);
            const gas = await contract.methods
                .approve(contractAddress, approvedAmount)
                .estimateGas({ from: Injector.walletAddress }, undefined);
            const gasPrice = await this.getGasPrice();

            const res = await contract.methods.approve(contractAddress, approvedAmount).send({
                from: Injector.walletAddress,
                gas: AmountParser.stringifyAmount(gas),
                gasPrice: AmountParser.stringifyAmount(gasPrice)
            });

            return true;
        } catch (err) {
            return false;
        }
    }

    public static async estimateEthGas({ from, to, value, data }: EstimateGasParams): Promise<number> {
        const params = {
            from,
            to,
            value: AmountParser.stringifyAmount(value || 0),
            ...(data && { data })
        };
        const gas = await Injector.web3Eth.eth.estimateGas(params, undefined, GAS_CONFIG);

        return gas;
    }

    /**
     * Calculates the average price per unit of gas according to web3.
     * @returns Average gas price in wei.
     */
    public static getGasPrice(): Promise<number> {
        return Injector.web3.eth.getGasPrice(GAS_PRICE_CONFIG);
    }

    public static async getBalance(walletAddress: string, tokenAddress: string): Promise<BigNumber> {
        const balance = TokenService.isNative(tokenAddress)
            ? await this._getNativeBalance(walletAddress)
            : await this._getNotNativeBalance(walletAddress, tokenAddress);

        return balance;
    }

    public static async getDecimals(tokenAddress: string): Promise<number> {
        const web3 = Injector.web3;
        const contract = new web3.eth.Contract(ERC20_TOKEN_ABI, tokenAddress);
        const decimals = (await contract.methods.decimals().call()) as number;

        return new BigNumber(decimals).toNumber();
    }

    private static async _getNativeBalance(walletAddress: string): Promise<BigNumber> {
        const weiAmount = await Injector.web3.eth.getBalance(walletAddress);
        const amount = Injector.web3.utils.fromWei(weiAmount, 'ether');

        return new BigNumber(amount);
    }

    private static async _getNotNativeBalance(walletAddress: string, tokenAddress: string): Promise<BigNumber> {
        try {
            const web3 = Injector.web3;
            const contract = new web3.eth.Contract(ERC20_TOKEN_ABI, tokenAddress);
            const [weiAmount, decimals] = (await Promise.all([
                contract.methods.balanceOf(walletAddress).call(),
                this.getDecimals(tokenAddress)
            ])) as [string, number];
            const amount = AmountParser.fromWei(weiAmount, decimals);

            return new BigNumber(amount);
        } catch (err) {
            throw new Error(('[GET_BALANCE_NOT_NATIVE]' + err) as string);
        }
    }
}
