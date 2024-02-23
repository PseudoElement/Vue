import { SwapService } from '../../services/swap/swap-service';
import { UNISWAP_V2_CONTRACT_ADDRESS } from './models/uniswap-v2-contract-address';
import { Web3Service } from '../../services/web3-service/web3-service';
import { UNISWAP_V2_ABI } from './constants/uniswap-v2-abi';
import { AmountParser } from '../../services/amount-parser/amount-parser';
import { AppContractAbi, ContractParams } from '../../services/swap/models/swap-types';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { AbstractDexTrade } from '../abstract/abstract-dex-trade';
import { DEXES } from '../models/dexes-list';
import { TxHash } from '../models/trade-common-types';
import { Injector } from '../../services/injector/injector';
import { TxParams } from '../../services/web3-service/models/web3-service-types';
import { UniswapV2SupportedChain } from './models/uniswap-v2-supported-blockchains';
import { ERC20_TOKEN_ABI } from '../../constants/abi/erc20-token-abi';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';

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

    public async swap2(): Promise<void> {
        const RPC_URL = 'https://bsc-dataseed.binance.org/';
        const web3 = new Web3(RPC_URL);

        const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'; // USDT address on BSC
        const USDC_ADDRESS = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'; // USDC address on BSC
        const ROUTER_ADDRESS = '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F'; // UniswapV2 Router address on BSC

        // Contract instances
        const usdtContract = new web3.eth.Contract(ERC20_TOKEN_ABI, USDT_ADDRESS);
        const routerContract = new web3.eth.Contract(this.contractAbi, ROUTER_ADDRESS);

        const walletAddress = Injector.walletAddress;

        // Approve USDT token for spending by the Router contract
        const approveAmount = new BigNumber(2).pow(256).minus(1).toFixed(0); // Max uint256 value
        usdtContract.methods
            .approve(ROUTER_ADDRESS, approveAmount)
            .send({ from: walletAddress })
            .then((approveTx) => {
                console.log('Approval transaction:', approveTx);

                // Execute the swap
                const amountIn = web3.utils.toWei('3', 'ether'); // Amount of USDT to swap (3 USDT)
                const path = [USDT_ADDRESS, USDC_ADDRESS]; // Path for the swap
                const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

                routerContract.methods
                    .swapExactTokensForTokens(
                        amountIn,
                        0, // AmountOutMin - set to 0 because the exact output amount is not specified
                        path,
                        walletAddress,
                        deadline
                    )
                    .send({ from: walletAddress })
                    .then((swapTx) => {
                        console.log('Swap transaction:', swapTx);
                    })
                    .catch((err) => {
                        console.error('Swap error:', err);
                    });
            })
            .catch((err) => {
                console.error('Approval error:', err);
            });
    }

    public async swap(): Promise<TxHash> {
        const approved = await Web3Service.isTxApproved(this.from.amount, this.from.address, this.contractAddress);

        if (!approved) {
            throw new Error('TRANSACTION NOT APPROVED!');
        }
        // const txParams = await this.getTransactionParams();
        // console.log(txParams);
        // const txHash = await SwapService.sendTransaction(txParams);
        const params = this.getContractParams();
        console.log(params);
        const txHash = await SwapService.callContractMethod(params);

        return 'Hash';
    }

    private getContractParams(): ContractParams {
        const value = AmountParser.toWei(this.from.amount, this.from.decimals);
        const amountOutMinWei = '0';
        const path = [this.from.address, this.to.address];
        const deadline = this.getTxDeadline();
        const methodArguments = [value, amountOutMinWei, path, this.walletAddress, deadline];
        const methodName = 'swapExactTokensForTokens';
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

    private async getTransactionParams(): Promise<TxParams> {
        const value = AmountParser.toWei(this.from.amount, this.from.decimals);
        const amountOutMinWei = '0';
        const path = [this.from.address, this.to.address];
        const deadline = this.getTxDeadline();
        const methodArguments = [value, amountOutMinWei, path, this.walletAddress, deadline];
        const methodName = 'swapExactTokensForTokens';
        const data = Web3Service.encodeTxData(this.contractAbi, methodName, methodArguments);
        const txParams = await Web3Service.getTxParams({ value: '0', data, contractAddress: this.contractAddress });

        return txParams;
    }
}
