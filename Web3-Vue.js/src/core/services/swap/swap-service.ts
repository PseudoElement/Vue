import Web3, { Web3Error } from 'web3';
import { CallContractParams, SendContractParams, SendTxParams } from './models/swap-types';

export class SwapService {
    private static _web3: Web3 = new Web3();

    public static async sendTransaction({ fromAddress, toAddress, value, data }: SendTxParams): Promise<string> {
        try {
            const gas = await this._web3.eth.estimateGas({ from: fromAddress, to: toAddress, value, data });
            const res = await this._web3.eth
                .sendTransaction({
                    from: fromAddress,
                    to: toAddress,
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
        const contract = new this._web3.eth.Contract(p.abi, p.contractAddress);
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
        const contract = new this._web3.eth.Contract(p.abi, p.contractAddress);
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