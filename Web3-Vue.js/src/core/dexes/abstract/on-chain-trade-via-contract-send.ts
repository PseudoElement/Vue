import { Web3Service } from '../../services/web3-service/web3-service';
import { AppContractAbi, ContractParams } from '../../services/web3-transaction/models/web3-transaction-types';
import { Web3TxService } from '../../services/web3-transaction/web3-transaction-service';
import { ContractMethodArguments, TxHash } from '../models/trade-common-types';
import { AbstractOnChainTrade } from './abstract-on-chain-trade';

export abstract class OnChainTradeViaContractSend extends AbstractOnChainTrade {
    protected abstract readonly contractAbi: AppContractAbi;

    protected async makeSwap(): Promise<TxHash> {
        const params = this.getContractParams();

        const approved = await Web3Service.isTxApproved(this.from.amount, this.from.address, this.contractAddress);

        if (!approved) {
            throw new Error('TRANSACTION NOT APPROVED!');
        }

        const txHash = await Web3TxService.sendContractMethod(params);

        return txHash;
    }

    protected getContractParams(): ContractParams {
        const methodArguments = this.getMethodArguments();
        const methodName = this.getMethodName();
        const data = Web3Service.encodeTxData(this.contractAbi, methodName, methodArguments);

        return {
            abi: this.contractAbi,
            contractAddress: this.contractAddress,
            methodArgs: methodArguments,
            methodName,
            data,
            value: '0'
        };
    }

    protected abstract getMethodName(): string;

    protected abstract getMethodArguments(): ContractMethodArguments;
}
