import { TxParams } from '../../services/web3-service/models/web3-service-types';
import { Web3TxService } from '../../services/web3-transaction/web3-transaction-service';
import { TxHash } from '../models/trade-common-types';
import { AbstractOnChainTrade } from './abstract-on-chain-trade';

export abstract class OnChainTradeViaSendTx extends AbstractOnChainTrade {
    protected async makeSwap(): Promise<TxHash> {
        const params = await this.getTransactionParams();
        const txHash = await Web3TxService.sendTransaction(params);

        return txHash;
    }

    protected abstract getTransactionParams(): Promise<TxParams>;
}
