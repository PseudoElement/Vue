import { Injector } from '../../services/injector/injector';
import { AppContractAbi, ContractParams } from '../../services/swap/models/swap-types';
import { SwapService } from '../../services/swap/swap-service';
import { TxParams } from '../../services/web3-service/models/web3-service-types';
import { Web3Service } from '../../services/web3-service/web3-service';
import { OnChainProviderType } from '../models/on-chain-provider-type';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { ContractMethodArguments, SWAP_TX_TYPE, SwapTxType, TxHash } from '../models/trade-common-types';

export abstract class AbstractOnChainTrade {
    public abstract readonly type: OnChainProviderType;

    private readonly swapType: SwapTxType;

    protected abstract readonly from: TokenInfo;

    protected abstract readonly to: TokenInfoWithoutAmount;

    protected abstract readonly contractAddress: string;

    protected abstract readonly contractAbi: AppContractAbi;

    protected get walletAddress(): string {
        return Injector.storeState.wallet.address as string;
    }

    constructor(swapType: SwapTxType) {
        this.swapType = swapType;
    }

    public async swap(): Promise<TxHash> {
        try {
            const approved = await Web3Service.isTxApproved(this.from.amount, this.from.address, this.contractAddress);

            if (!approved) {
                throw new Error('TRANSACTION NOT APPROVED!');
            }

            if (this.swapType === SWAP_TX_TYPE.SWAP_VIA_CONTRACT_SEND) {
                const txHash = await this.swapViaContractSend();
                return txHash;
            }

            const txHash = await this.swapViaSendTransaction();
            return txHash;
        } catch (err: any) {
            throw new Error(`SWAP ERROR - ${err.message}`);
        }
    }

    private async swapViaContractSend(): Promise<TxHash> {
        const params = this.getTransactionParams();
        const txHash = await SwapService.sendTransaction(params);

        return txHash;
    }

    private async swapViaSendTransaction(): Promise<TxHash> {
        const params = this.getContractParams();
        const txHash = await SwapService.sendContractMethod(params);

        return txHash;
    }

    protected getTxDeadline(maxTimeSecs: number = 300): number {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const deadline = currentTimestamp + maxTimeSecs;
        return deadline;
    }

    protected abstract getMethodName(): string;

    protected abstract getMethodArguments(): ContractMethodArguments;

    protected abstract getContractParams(): ContractParams;

    protected abstract getTransactionParams(): TxParams;
}
