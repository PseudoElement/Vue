import { useStore } from 'vuex';
import { SwapService } from '../../services/swap/swap-service';
import { StoreState } from '../../store/models/store-types';
import { UNISWAP_V2_CONTRACT_ADDRESS } from './constants/uniswap-v2-contract-address';
import { Web3Service } from '../../services/web3-service/web3-service';
import { UNISWAP_V2_ABI } from './constants/uniswap-v2-abi';
import { AmountParser } from '../../services/amount-parser/amount-parser';
import { AppContractAbi, SendTxParams } from '../../services/swap/models/swap-types';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { AbstractDexTrade } from '../abstract/abstract-dex-trade';
import { DEXES } from '../models/dexes-list';
import { TxHash } from '../models/trade-common-types';

export class UniswapV2Trade extends AbstractDexTrade {
    public readonly type = DEXES.UNISWAP_V2;

    private readonly contractAddress: string = UNISWAP_V2_CONTRACT_ADDRESS;

    private readonly contractAbi: AppContractAbi = UNISWAP_V2_ABI;

    public async swap(from: TokenInfo, to: TokenInfoWithoutAmount): Promise<TxHash> {
        const txParams = this.getTransactionParams(from, to);

        return SwapService.sendTransaction(txParams);
    }

    private getTransactionParams(from: TokenInfo, to: TokenInfoWithoutAmount): SendTxParams {
        const walletAddress = useStore<StoreState>().state.wallet.address as string;
        const amountInWei = AmountParser.toWei(from.amount, from.decimals);
        const amountOutMinWei = AmountParser.toWei(from.amount.multipliedBy(0.9), from.decimals);
        const path = [from.address, to.address];
        const deadline = this.getTxDeadline();
        const methodArguments = [amountInWei, amountOutMinWei, path, walletAddress, deadline];
        const methodName = 'swapExactTokensForTokens';
        const data = Web3Service.encodeTxData(this.contractAbi, methodName, methodArguments);

        return {
            fromAddress: walletAddress,
            to: this.contractAddress,
            value: amountInWei,
            data
        };
    }
}
