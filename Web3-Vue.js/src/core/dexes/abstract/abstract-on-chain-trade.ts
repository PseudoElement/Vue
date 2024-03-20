import BigNumber from 'bignumber.js';
import { BlockchainName } from '../../constants/blockchain-names';
import { Injector } from '../../services/injector/injector';
import { OnChainProviderType } from '../models/on-chain-provider-type';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { TxHash } from '../models/trade-common-types';
import { Utils } from '../../utils/utils';
import { AmountParser } from '../../services/amount-parser/amount-parser';
import { TxParams } from '../../services/web3-service/models/web3-service-types';
import { BLOCKCHAIN_IDS } from '../../constants/blockchain-ids';

export abstract class AbstractOnChainTrade {
    public outputAmount: BigNumber | null = null;

    public get outputAmountString(): string {
        const nonWeiAmount = AmountParser.fromWei(this.outputAmount, this.to.decimals);
        return nonWeiAmount.toFixed();
    }

    protected get _fromChainId(): number {
        return BLOCKCHAIN_IDS[this.from.blockchain];
    }

    protected get _fromAmountWei(): string {
        return AmountParser.toWei(this.from.amount, this.from.decimals);
    }

    public abstract readonly type: OnChainProviderType;

    public abstract readonly from: TokenInfo;

    public abstract readonly to: TokenInfoWithoutAmount;

    protected abstract contractAddress: string;

    protected abstract readonly supportedBlockchains: BlockchainName[];

    protected txParams: TxParams = {} as TxParams;

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
            const txHash = await this.makeSwap();

            return txHash;
        } catch (err: any) {
            throw new Error(`SWAP ERROR - ${err.message}`);
        }
    }

    protected abstract makeSwap(): Promise<TxHash>;

    protected areSupportedFromToBlockchains(): boolean {
        return this.supportedBlockchains.includes(this.from.blockchain) && this.supportedBlockchains.includes(this.to.blockchain);
    }

    protected getTxDeadline(maxTimeSecs: number = 300): number {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const deadline = currentTimestamp + maxTimeSecs;
        return deadline;
    }

    protected abstract getOutputAmount(): Promise<BigNumber>;
}
