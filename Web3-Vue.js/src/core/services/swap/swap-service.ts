import { ContractParams } from './models/swap-types';
import { TxHash } from '../../dexes/models/trade-common-types';
import { Injector } from '../injector/injector';
import { TxParams } from '../web3-service/models/web3-service-types';
import { Web3Service } from '../web3-service/web3-service';
import { AmountParser } from '../amount-parser/amount-parser';

export class SwapService {
    public static async sendTransaction({ fromAddress, toAddress, value, data, gas, gasPrice }: TxParams): Promise<TxHash> {
        const res = await Injector.web3.eth
            .sendTransaction({
                from: fromAddress,
                to: toAddress,
                value,
                data,
                gas,
                gasPrice
            })
            .on('error', (err) => this._onError(err));

        return res.transactionHash as string;
    }

    public static async sendContractMethod(p: ContractParams): Promise<string> {
        const gas = await Web3Service.estimateEthGas({ from: Injector.walletAddress, to: p.contractAddress, data: p.data, value: p.value });
        const gasPrice = await Web3Service.getGasPrice();

        const contract = new Injector.web3.eth.Contract(p.abi, p?.contractAddress);
        const res = await contract.methods[p.methodName](...p.methodArgs)
            .send({
                from: Injector.walletAddress,
                value: p.value,
                ...(p.data && { data: p.data }),
                gas: AmountParser.stringifyAmount(gas),
                gasPrice: AmountParser.stringifyAmount(gasPrice)
            })
            .on('error', (err) => this._onError(err));

        return res.transactionHash as string;
    }

    public static async callContractMethod(p: ContractParams): Promise<void> {
        try {
            const gas = await Web3Service.estimateEthGas({
                from: Injector.walletAddress,
                to: p.contractAddress,
                data: p.data,
                value: p.value
            });
            const gasPrice = await Web3Service.getGasPrice();
            const contract = new Injector.web3.eth.Contract(p.abi, p.contractAddress);
            const res = await contract.methods[p.methodName](...p.methodArgs).call({
                from: Injector.walletAddress,
                value: p.value,
                ...(p.data && { data: p.data }),
                gas: AmountParser.stringifyAmount(gas),
                gasPrice: AmountParser.stringifyAmount(gasPrice)
            });

            console.log('CALL_RES', res);
        } catch (err) {
            this._onError(err);
        }
    }

    private static _onError(err: unknown): void {
        throw new Error(`Error occured sending transaction -${err}!`);
    }
}
