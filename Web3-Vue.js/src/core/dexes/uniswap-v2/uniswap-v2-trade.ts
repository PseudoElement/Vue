import { SwapService } from '../../services/swap/swap-service';
import { UNISWAP_V2_CONTRACT_ADDRESS } from './models/uniswap-v2-contract-address';
import { Web3Service } from '../../services/web3-service/web3-service';
import { UNISWAP_V2_ABI } from './constants/uniswap-v2-abi';
import { AmountParser } from '../../services/amount-parser/amount-parser';
import { AppContractAbi } from '../../services/swap/models/swap-types';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { AbstractDexTrade } from '../abstract/abstract-dex-trade';
import { DEXES } from '../models/dexes-list';
import { TxHash } from '../models/trade-common-types';
import { Injector } from '../../services/injector/injector';
import { TxParams } from '../../services/web3-service/models/web3-service-types';
import { UniswapV2SupportedChain } from './models/uniswap-v2-supported-blockchains';

export class UniswapV2Trade extends AbstractDexTrade {
    public readonly type = DEXES.UNISWAP_V2;

    public readonly from: TokenInfo;

    public readonly to: TokenInfoWithoutAmount;

    protected readonly contractAbi: AppContractAbi = UNISWAP_V2_ABI;

    protected get contractAddress(): string {
        return UNISWAP_V2_CONTRACT_ADDRESS[this.from.blockchain as UniswapV2SupportedChain];
    }

    private get walletAddress(): string {
        return Injector.storeState.wallet.address as string;
    }

    constructor(from: TokenInfo, to: TokenInfoWithoutAmount) {
        super();
        this.from = from;
        this.to = to;
    }

    public async swap(): Promise<TxHash> {
        await Web3Service.approve(this.contractAddress, this.from.address);
        const txParams = await this.getTransactionParams();
        const txHash = await SwapService.sendTransaction(txParams);

        return txHash;
    }

    private async getTransactionParams(): Promise<TxParams> {
        const value = AmountParser.toWei(this.from.amount, this.from.decimals);
        const amountOutMinWei = '0';
        const path = [this.from.address, this.to.address];
        const deadline = this.getTxDeadline();
        const methodArguments = [value, amountOutMinWei, path, this.walletAddress, deadline];
        const methodName = 'swapExactTokensForTokens';
        const data = Web3Service.encodeTxData(this.contractAbi, methodName, methodArguments);
        const txParams = await Web3Service.getTxParams({ value, data, contractAddress: this.contractAddress });

        return txParams;
    }
}
