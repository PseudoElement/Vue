import { UNISWAP_V2_CONTRACT_ADDRESS } from './models/uniswap-v2-contract-address';
import { Web3Service } from '../../services/web3-service/web3-service';
import { UNISWAP_V2_ABI } from './constants/uniswap-v2-abi';
import { AmountParser } from '../../services/amount-parser/amount-parser';
import { AppContractAbi, ContractParams } from '../../services/web3-transaction/models/web3-transaction-types';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { AbstractOnChainTrade } from '../abstract/abstract-dex-trade';
import { ON_CHAIN_PROVIDER } from '../models/on-chain-provider-type';
import { ContractMethodArguments, SWAP_TX_TYPE, SwapTxType } from '../models/trade-common-types';
import { TxParams } from '../../services/web3-service/models/web3-service-types';
import { UNISWAP_V2_SUPPORTED_CHAINS, UniswapV2SupportedChain } from './models/uniswap-v2-supported-blockchains';
import { TokenService } from '../../services/token-service';
import { BlockchainName } from '../../constants/blockchain-names';
import BigNumber from 'bignumber.js';

export class UniswapV2Trade extends AbstractOnChainTrade {
    public readonly type = ON_CHAIN_PROVIDER.UNISWAP_V2;

    public readonly swapType: SwapTxType = SWAP_TX_TYPE.SWAP_VIA_CONTRACT_SEND;

    public readonly from: TokenInfo;

    public readonly to: TokenInfoWithoutAmount;

    protected readonly contractAbi: AppContractAbi = UNISWAP_V2_ABI;

    protected readonly supportedBlockchains: BlockchainName[] = UNISWAP_V2_SUPPORTED_CHAINS;

    protected get contractAddress(): string {
        return UNISWAP_V2_CONTRACT_ADDRESS[this.from.blockchain as UniswapV2SupportedChain];
    }

    constructor(from: TokenInfo, to: TokenInfoWithoutAmount) {
        super();
        this.from = from;
        this.to = to;
    }

    //@TODO Find way to calc outputAmount
    protected async getOutputAmount(): Promise<BigNumber> {
        return new BigNumber(AmountParser.toWei(this.from.amount.multipliedBy(0.95), this.from.decimals));
    }

    protected getTransactionParams(): TxParams {
        const methodArguments = this.getMethodArguments();
        const methodName = this.getMethodName();
        const data = Web3Service.encodeTxData(this.contractAbi, methodName, methodArguments);

        return {
            to: this.contractAddress,
            data,
            value: '0'
        };
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

    protected getMethodName(): string {
        if (TokenService.isNative(this.from.address)) {
            return 'swapExactETHForTokens';
        } else if (TokenService.isNative(this.to.address)) {
            return 'swapExactTokensForETH';
        } else {
            return 'swapExactTokensForTokens';
        }
    }

    protected getMethodArguments(): ContractMethodArguments {
        if (TokenService.isNative(this.from.address)) {
            return this.getNativeToTokenMethodArguments();
        } else {
            return this.getTokenToAnyMethodArguments();
        }
    }

    private getTokenToAnyMethodArguments(): ContractMethodArguments {
        const value = AmountParser.toWei(this.from.amount, this.from.decimals);
        const amountOutMinWei = '0';
        const path = [this.from.address, this.to.address];
        const deadline = this.getTxDeadline();
        const methodArguments = [value, amountOutMinWei, path, this.walletAddress, deadline];

        return methodArguments;
    }

    private getNativeToTokenMethodArguments(): ContractMethodArguments {
        const amountOutMinWei = '0';
        const path = [this.from.address, this.to.address];
        const deadline = this.getTxDeadline();
        const methodArguments = [amountOutMinWei, path, this.walletAddress, deadline];

        return methodArguments;
    }
}
