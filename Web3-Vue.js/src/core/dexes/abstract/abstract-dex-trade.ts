import { Injector } from '../../services/injector/injector';
import { AppContractAbi, ContractParams } from '../../services/swap/models/swap-types';
import { SwapService } from '../../services/swap/swap-service';
import { TxParams } from '../../services/web3-service/models/web3-service-types';
import { Web3Service } from '../../services/web3-service/web3-service';
import { DexType } from '../models/dexes-list';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { TxHash } from '../models/trade-common-types';

export abstract class AbstractDexTrade {
    public abstract readonly type: DexType;

    protected abstract readonly from: TokenInfo;

    protected abstract readonly to: TokenInfoWithoutAmount;

    protected abstract readonly contractAddress: string;

    protected abstract readonly contractAbi: AppContractAbi;

    protected get walletAddress(): string {
        return Injector.storeState.wallet.address as string;
    }

    public async swap(): Promise<TxHash> {
        try {
            const approved = await Web3Service.isTxApproved(this.from.amount, this.from.address, this.contractAddress);

            if (!approved) {
                throw new Error('TRANSACTION NOT APPROVED!');
            }

            const params = this.getContractParams();
            const txHash = await SwapService.sendContractMethod(params);

            return txHash;
        } catch (err: any) {
            throw new Error(`SWAP ERROR - ${err.message}`);
        }
    }

    public async swap2(): Promise<TxHash> {
        try {
            const approved = await Web3Service.isTxApproved(this.from.amount, this.from.address, this.contractAddress);

            if (!approved) {
                throw new Error('TRANSACTION NOT APPROVED!');
            }

            const params = this.getTransactionParams();
            const txHash = await SwapService.sendTransaction(params);

            return txHash;
        } catch (err: any) {
            throw new Error(`SWAP ERROR - ${err.message}`);
        }
    }

    protected getTxDeadline(maxTimeSecs: number = 300): number {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const deadline = currentTimestamp + maxTimeSecs;
        return deadline;
    }

    protected abstract getContractParams(): ContractParams;

    protected abstract getTransactionParams(): TxParams;
}
