import { CallContractParams, ContractParams } from './models/web3-transaction-types';
import { TxHash } from '../../dexes/models/trade-common-types';
import { Injector } from '../injector/injector';
import { AppTxReceipt, TxParams } from '../web3-service/models/web3-service-types';
import { Web3Service } from '../web3-service/web3-service';
import { AmountParser } from '../amount-parser/amount-parser';

export class Web3TxService {
    public static async sendTransaction({ to, value, data }: TxParams): Promise<TxHash> {
        try {
            const gasPrice = await Web3Service.getGasPrice();
            const gas = '700000';

            const res = await Injector.web3Eth.eth.sendTransaction({
                from: Injector.walletAddress,
                to,
                value,
                data,
                gas: AmountParser.stringifyAmount(gas, 1.05),
                gasPrice
            });

            return res.transactionHash as string;
        } catch (err) {
            throw err;
        }
    }

    public static async sendContractMethod(p: ContractParams): Promise<string> {
        try {
            Injector.web3.handleRevert = true;
            const contract = new Injector.web3Eth.eth.Contract(p.abi, p?.contractAddress);
            const gasPrice = await Web3Service.getGasPrice();
            const gas = await contract.methods[p.methodName](...p.methodArgs).estimateGas({
                from: Injector.walletAddress,
                value: p.value
            });

            const res = await contract.methods[p.methodName](...p.methodArgs).send({
                from: Injector.walletAddress,
                value: p.value,
                ...(p.data && { data: p.data }),
                gas: AmountParser.stringifyAmount(gas),
                gasPrice: AmountParser.stringifyAmount(gasPrice)
            });

            return res.transactionHash as string;
        } catch (err) {
            throw err;
        }
    }

    public static async callContractMethod(p: CallContractParams): Promise<unknown> {
        try {
            const contract = new Injector.web3.eth.Contract(p.abi, p.contractAddress);

            const res = (await contract.methods[p.methodName](...p.methodArgs).call({
                from: Injector.walletAddress
            })) as AppTxReceipt;

            return res;
        } catch (err) {
            throw new Error(`Error occured sending transaction -${err}!`);
        }
    }
}
