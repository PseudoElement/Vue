import { ContractParams } from './models/web3-transaction-types';
import { TxHash } from '../../dexes/models/trade-common-types';
import { Injector } from '../injector/injector';
import { AppTxReceipt, TxParams } from '../web3-service/models/web3-service-types';
import { Web3Service } from '../web3-service/web3-service';
import { AmountParser } from '../amount-parser/amount-parser';

export class Web3TxService {
    public static async sendTransaction({ to, value, data }: TxParams): Promise<TxHash> {
        const gasPrice = await Web3Service.getGasPrice();
        // const gas = await Injector.web3.eth.estimateGas({
        //     from: Injector.walletAddress,
        //     to,
        //     data,
        //     value
        // });
        const gas = '300000';

        const res = await Injector.web3.eth
            .sendTransaction({
                from: Injector.walletAddress,
                to,
                value,
                data,
                gas: AmountParser.stringifyAmount(gas, 1.05),
                gasPrice
            })
            .on('error', (err) => this._onError(err));

        return res.transactionHash as string;
    }

    public static async sendContractMethod(p: ContractParams): Promise<string> {
        Injector.web3.handleRevert = true;
        const contract = new Injector.web3Eth.eth.Contract(p.abi, p?.contractAddress);
        const gasPrice = await Web3Service.getGasPrice();
        const gas = '300000';
        // const gas = await contract.methods[p.methodName](...p.methodArgs).estimateGas({
        //     from: Injector.walletAddress,
        //     gas: '3000000',
        //     gasPrice: AmountParser.stringifyAmount(gasPrice)
        // });

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

    public static async callContractMethod(p: ContractParams): Promise<string> {
        try {
            const gas = await Web3Service.estimateEthGas({
                from: Injector.walletAddress,
                to: p.contractAddress,
                data: p.data,
                value: p.value
            });
            const gasPrice = await Web3Service.getGasPrice();
            const contract = new Injector.web3Eth.eth.Contract(p.abi, p.contractAddress);
            const res = (await contract.methods[p.methodName](...p.methodArgs).call({
                from: Injector.walletAddress,
                value: p.value,
                ...(p.data && { data: p.data }),
                gas: AmountParser.stringifyAmount(gas),
                gasPrice: AmountParser.stringifyAmount(gasPrice)
            })) as AppTxReceipt;

            return res.transactionHash;
        } catch (err) {
            this._onError(err);
            return '';
        }
    }

    private static _onError(err: unknown): void {
        throw new Error(`Error occured sending transaction -${err}!`);
    }
}
