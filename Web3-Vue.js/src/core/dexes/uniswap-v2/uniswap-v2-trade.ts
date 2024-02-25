import { UNISWAP_V2_CONTRACT_ADDRESS } from './models/uniswap-v2-contract-address';
import { Web3Service } from '../../services/web3-service/web3-service';
import { UNISWAP_V2_ABI } from './constants/uniswap-v2-abi';
import { AmountParser } from '../../services/amount-parser/amount-parser';
import { AppContractAbi, ContractParams } from '../../services/swap/models/swap-types';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { AbstractDexTrade } from '../abstract/abstract-dex-trade';
import { DEXES } from '../models/dexes-list';
import { ContractMethodArguments } from '../models/trade-common-types';
import { TxParams } from '../../services/web3-service/models/web3-service-types';
import { UniswapV2SupportedChain } from './models/uniswap-v2-supported-blockchains';
import { TokenService } from '../../services/token-service';

export class UniswapV2Trade extends AbstractDexTrade {
    public readonly type = DEXES.UNISWAP_V2;

    protected readonly from: TokenInfo;

    protected readonly to: TokenInfoWithoutAmount;

    protected readonly contractAbi: AppContractAbi = UNISWAP_V2_ABI;

    protected get contractAddress(): string {
        return UNISWAP_V2_CONTRACT_ADDRESS[this.from.blockchain as UniswapV2SupportedChain];
    }

    constructor(from: TokenInfo, to: TokenInfoWithoutAmount) {
        super();
        this.from = from;
        this.to = to;
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

    private getMethodName(): string {
        if (TokenService.isNative(this.from.address)) {
            return 'swapExactETHForTokens';
        } else if (TokenService.isNative(this.to.address)) {
            return 'swapExactTokensForETH';
        } else {
            return 'swapExactTokensForTokens';
        }
    }

    private getMethodArguments(): ContractMethodArguments {
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
