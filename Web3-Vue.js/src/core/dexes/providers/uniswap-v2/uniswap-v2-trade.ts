import { UNISWAP_V2_CONTRACT_ADDRESS } from './models/uniswap-v2-contract-address';
import { UNISWAP_V2_ABI } from './constants/uniswap-v2-abi';
import { AmountParser } from '../../../services/amount-parser/amount-parser';
import { AppContractAbi } from '../../../services/web3-transaction/models/web3-transaction-types';
import { TokenInfo, TokenInfoWithoutAmount } from '../../models/token-types';
import { ON_CHAIN_PROVIDER } from '../../models/on-chain-provider-type';
import { ContractMethodArguments } from '../../models/trade-common-types';
import { UNISWAP_V2_SUPPORTED_CHAINS, UniswapV2SupportedChain } from './models/uniswap-v2-supported-blockchains';
import { TokenService } from '../../../services/token-service';
import { BlockchainName } from '../../../constants/blockchain-names';
import BigNumber from 'bignumber.js';
import { Web3TxService } from '../../../services/web3-transaction/web3-transaction-service';
import { OnChainTradeViaContractSend } from '../../abstract/on-chain-trade-via-contract-send';

export class UniswapV2Trade extends OnChainTradeViaContractSend {
    public readonly type = ON_CHAIN_PROVIDER.UNISWAP_V2;

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

    protected async getOutputAmount(): Promise<BigNumber> {
        const fromAmountWei = AmountParser.toWei(this.from.amount, this.from.decimals);
        const path = [this.from.address, this.to.address];
        const methodArgs = [fromAmountWei, path];

        const [_, outputAmount] = (await Web3TxService.callContractMethod({
            abi: this.contractAbi,
            contractAddress: this.contractAddress,
            methodName: 'getAmountsOut',
            methodArgs
        })) as number[];

        return new BigNumber(outputAmount);
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
