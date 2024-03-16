import BigNumber from 'bignumber.js';
import { BlockchainName } from '../../../constants/blockchain-names';
import { TxParams } from '../../../services/web3-service/models/web3-service-types';
import { ON_CHAIN_PROVIDER } from '../../models/on-chain-provider-type';
import { TokenInfo, TokenInfoWithoutAmount } from '../../models/token-types';
import { AmountParser } from '../../../services/amount-parser/amount-parser';
import { OnChainTradeViaSendTx } from '../../abstract/on-chain-trade-via-send-tx';
import { ONE_INCH_SUPPORTED_BLOCKCHAINS } from './models/1inch-supported-chains';
import { OneInchApiService } from './services/1inch-api-service';
import { BLOCKCHAIN_IDS } from '../../../../core/constants/blockchain-ids';
import { OneInchQuoteReqParams, OneInchSwapReqParams } from './models/1inch-api-types';
import { Injector } from '../../../../core/services/injector/injector';

export class OneInchTrade extends OnChainTradeViaSendTx {
    public readonly type = ON_CHAIN_PROVIDER['1INCH'];

    public readonly from: TokenInfo;

    public readonly to: TokenInfoWithoutAmount;

    protected readonly supportedBlockchains: BlockchainName[] = ONE_INCH_SUPPORTED_BLOCKCHAINS;

    private _api = new OneInchApiService();

    private _contractAddress!: string;

    protected get contractAddress(): string {
        return this._contractAddress;
    }

    private get _fromChainId(): number {
        return BLOCKCHAIN_IDS[this.from.blockchain];
    }

    constructor(from: TokenInfo, to: TokenInfoWithoutAmount) {
        super();
        this.from = from;
        this.to = to;
    }

    protected async getOutputAmount(): Promise<BigNumber> {
        const fromAmountWei = AmountParser.toWei(this.from.amount, this.from.decimals);
        const params = {
            amount: fromAmountWei,
            src: this.from.address,
            dst: this.to.address,
            chainId: this._fromChainId
        } as Required<OneInchQuoteReqParams>;

        const quoteRes = await this._api.makeQuoteReq(params);

        return new BigNumber(quoteRes.toAmount);
    }

    protected async getTransactionParams(): Promise<TxParams> {
        const fromAmountWei = AmountParser.toWei(this.from.amount, this.from.decimals);
        const params = {
            amount: fromAmountWei,
            src: this.from.address,
            dst: this.to.address,
            from: Injector.walletAddress,
            receiver: Injector.walletAddress,
            chainId: BLOCKCHAIN_IDS[this.from.blockchain],
            slippage: 3
        } as Required<OneInchSwapReqParams>;

        const { tx } = await this._api.makeSwapReq(params);
        this._contractAddress = tx.to;

        return {
            to: tx.to,
            data: tx.data,
            value: tx.value
        };
    }
}
