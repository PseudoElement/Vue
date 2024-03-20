import BigNumber from 'bignumber.js';
import { BlockchainName } from '../../../constants/blockchain-names';
import { TxParams } from '../../../services/web3-service/models/web3-service-types';
import { ON_CHAIN_PROVIDER } from '../../models/on-chain-provider-type';
import { TokenInfo, TokenInfoWithoutAmount } from '../../models/token-types';
import { AmountParser } from '../../../services/amount-parser/amount-parser';
import { OnChainTradeViaSendTx } from '../../abstract/on-chain-trade-via-send-tx';
import { ONE_INCH_SUPPORTED_BLOCKCHAINS } from './models/1inch-supported-chains';
import { OneInchApiService } from './services/1inch-api-service';
import { OneInchQuoteReqParams, OneInchSwapReqParams } from './models/1inch-api-types';
import { Injector } from '../../../../core/services/injector/injector';
import { Web3TxService } from '../../../../core/services/web3-transaction/web3-transaction-service';
import { Utils } from '../../../../core/utils/utils';

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

    constructor(from: TokenInfo, to: TokenInfoWithoutAmount) {
        super();
        this.from = from;
        this.to = to;
    }

    protected async getOutputAmount(): Promise<BigNumber> {
        const params = {
            amount: this._fromAmountWei,
            src: this.from.address,
            dst: this.to.address,
            chainId: this._fromChainId
        } as Required<OneInchQuoteReqParams>;

        const quoteRes = await this._api.makeQuoteReq(params);

        return new BigNumber(quoteRes.dstAmount);
    }

    protected async getTransactionParams(): Promise<TxParams> {
        const params = {
            amount: this._fromAmountWei,
            src: this.from.address,
            dst: this.to.address,
            from: Injector.walletAddress,
            receiver: Injector.walletAddress,
            chainId: this._fromChainId,
            slippage: 3
        } as Required<OneInchSwapReqParams>;

        const needApprove = await this.needOneInchApprove();

        await Utils.wait(1000);

        if (needApprove) {
            await this.makeOneInchApprove();
        }

        await Utils.wait(1000);

        const { tx } = await this._api.makeSwapReq(params);
        this._contractAddress = tx.to;

        return {
            to: tx.to,
            data: tx.data,
            value: tx.value
        };
    }

    private async needOneInchApprove(): Promise<boolean> {
        const allowanceWei = await this._api.getAllowance({
            src: this.from.address,
            chainId: this._fromChainId,
            walletAddress: Injector.walletAddress
        });
        const allowance = AmountParser.fromWei(allowanceWei, this.from.decimals);

        return this.from.amount.gt(allowance);
    }

    private async makeOneInchApprove(): Promise<void> {
        const approveConfig = await this._api.getApproveConfig({
            amount: this._fromAmountWei,
            src: this.from.address,
            chainId: this._fromChainId
        });

        await Web3TxService.sendTransaction(approveConfig);
    }
}
