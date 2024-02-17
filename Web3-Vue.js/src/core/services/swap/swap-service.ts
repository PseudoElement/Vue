import { Web3Error } from 'web3';
import { CallContractParams, SendContractParams, SendTxParams } from './models/swap-types';
import { TxHash } from '../../dexes/models/trade-common-types';
import { Injector } from '../injector/injector';

export class SwapService {
    public static async sendTransaction({ fromAddress, to, value, data }: SendTxParams): Promise<TxHash> {
        try {
            const gas = await Injector.web3.eth.estimateGas({ from: fromAddress, to: to, value, data });
            const res = await Injector.web3.eth
                .sendTransaction({
                    from: fromAddress,
                    to,
                    value,
                    data,
                    gas
                })
                .on('error', (err) => this._onError(err));

            return res.transactionHash as string;
        } catch (err) {
            throw new Error('[SEND TRANSACTION]' + err);
        }
    }

    public static async sendContractMethod(p: SendContractParams): Promise<string> {
        const contract = new Injector.web3.eth.Contract(p.abi, p?.contractAddress);
        const res = await contract.methods[p.methodName](...p.methodArgs)
            .send({
                from: p.fromAddress,
                value: p.value,
                ...(p.data && { data: p.data }),
                ...(p.gas && { gas: p.gas }),
                ...(p.gasPrice && { gasPrice: p.gasPrice })
            })
            .on('error', (err) => this._onError(err));

        return res.transactionHash as string;
    }

    public static async callContractMethod(p: CallContractParams): Promise<void> {
        const contract = new Injector.web3.eth.Contract(p.abi, p.contractAddress);
        const res = await contract.methods[p.methodName](...p.methodArgs).call({
            from: p.fromAddress,
            value: p.value,
            ...(p.data && { data: p.data }),
            ...(p.gas && { gas: p.gas }),
            ...(p.gasPrice && { gasPrice: p.gasPrice })
        });

        console.log('[CALL_CONTRACT]', res);
    }

    private static _onError(err: Web3Error): void {
        throw new Error(`Error occured sending transaction -${err}!`);
    }
}
