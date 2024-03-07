import BigNumber from 'bignumber.js';
import { BlockchainName } from '../../constants/blockchain-names';
import { Injector } from '../../services/injector/injector';
import { AppContractAbi, ContractParams } from '../../services/web3-transaction/models/web3-transaction-types';
import { Web3TxService } from '../../services/web3-transaction/web3-transaction-service';
import { TxParams } from '../../services/web3-service/models/web3-service-types';
import { Web3Service } from '../../services/web3-service/web3-service';
import { OnChainProviderType } from '../models/on-chain-provider-type';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { ContractMethodArguments, SWAP_TX_TYPE, SwapTxType, TxHash } from '../models/trade-common-types';
import { Utils } from '../../utils/utils';
import { AmountParser } from '../../services/amount-parser/amount-parser';

export abstract class AbstractOnChainTrade {
    public outputAmount: BigNumber | null = null;

    public get outputAmountString(): string {
        const nonWeiAmount = AmountParser.fromWei(this.outputAmount, this.to.decimals);
        return nonWeiAmount.toFixed();
    }

    public abstract readonly type: OnChainProviderType;

    public abstract readonly swapType: SwapTxType;

    public abstract readonly from: TokenInfo;

    public abstract readonly to: TokenInfoWithoutAmount;

    protected abstract readonly contractAddress: string;

    protected abstract readonly contractAbi: AppContractAbi;

    protected abstract readonly supportedBlockchains: BlockchainName[];

    protected get walletAddress(): string {
        return Injector.storeState.wallet.address as string;
    }

    public async calculate(): Promise<AbstractOnChainTrade> {
        try {
            if (!this.areSupportedFromToBlockchains()) {
                throw new Error(`[${this.type}] Selected blockchains not supported!`);
            }

            await Utils.wait();

            this.outputAmount = await this.getOutputAmount();

            return this;
        } catch (err) {
            throw err;
        }
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
        const params = this.getContractParams();
        const txHash = await Web3TxService.sendContractMethod(params);

        return txHash;
    }

    private async swapViaSendTransaction(): Promise<TxHash> {
        const params = this.getTransactionParams();
        const txHash = await Web3TxService.sendTransaction(params);

        return txHash;
    }

    protected areSupportedFromToBlockchains(): boolean {
        return this.supportedBlockchains.includes(this.from.blockchain) && this.supportedBlockchains.includes(this.to.blockchain);
    }

    protected getTxDeadline(maxTimeSecs: number = 300): number {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const deadline = currentTimestamp + maxTimeSecs;
        return deadline;
    }

    protected abstract getOutputAmount(): Promise<BigNumber>;

    protected abstract getMethodName(): string;

    protected abstract getMethodArguments(): ContractMethodArguments;

    protected abstract getContractParams(): ContractParams;

    protected abstract getTransactionParams(): TxParams;
}
