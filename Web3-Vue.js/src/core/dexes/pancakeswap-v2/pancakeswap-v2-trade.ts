import BigNumber from 'bignumber.js';
import { BlockchainName } from '../../constants/blockchain-names';
import { AppContractAbi, ContractParams } from '../../services/web3-transaction/models/web3-transaction-types';
import { TxParams } from '../../services/web3-service/models/web3-service-types';
import { AbstractOnChainTrade } from '../abstract/abstract-dex-trade';
import { ON_CHAIN_PROVIDER } from '../models/on-chain-provider-type';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { ContractMethodArguments, SWAP_TX_TYPE, SwapTxType } from '../models/trade-common-types';
import { PANCAKESWAP_V2_ABI } from './constants/pancakeswap-v2-abi';
import { PANCAKESWAP_V2_CONTRACT_ADDRESS } from './models/pancakeswap-v2-contract-adress';
import { PANCAKESWAP_V2_SUPPORTED_CHAINS, PancakeSwapV2SupportedChain } from './models/pancakeswap-v2-supported-chains';
import { AmountParser } from '../../services/amount-parser/amount-parser';
import { TokenService } from '../../services/token-service';
import { Web3Service } from '../../services/web3-service/web3-service';
import { Web3TxService } from '../../services/web3-transaction/web3-transaction-service';

export class PancakeSwapV2Trade extends AbstractOnChainTrade {
    public readonly type = ON_CHAIN_PROVIDER.PANCAKESWAP_V2;

    public readonly swapType: SwapTxType = SWAP_TX_TYPE.SWAP_VIA_CONTRACT_SEND;

    public readonly from: TokenInfo;

    public readonly to: TokenInfoWithoutAmount;

    protected readonly contractAbi: AppContractAbi = PANCAKESWAP_V2_ABI;

    protected readonly supportedBlockchains: BlockchainName[] = PANCAKESWAP_V2_SUPPORTED_CHAINS;

    protected get contractAddress(): string {
        return PANCAKESWAP_V2_CONTRACT_ADDRESS[this.from.blockchain as PancakeSwapV2SupportedChain];
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
        console.log({ fromAmountWei, outputAmount });

        return new BigNumber(outputAmount);
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
