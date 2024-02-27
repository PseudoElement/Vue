import { TokenOption } from '@/src/features/swap/components/swap-form/models/swap-form-types';
import { BlockchainName } from '../constants/blockchain-names';
import { Injector } from './injector/injector';
import BigNumber from 'bignumber.js';

export class SwapFormService {
    public static setFromToken(token: TokenOption): void {
        Injector.storeCommit('setFromToken', token);
    }

    public static setFromAmount(amount: BigNumber): void {
        Injector.storeCommit('setFromAmount', amount);
    }

    public static setFromDecimals(): void {
        Injector.storeDispatch('setFromDecimals');
    }

    public static setToToken(token: TokenOption): void {
        Injector.storeCommit('setToToken', token);
    }

    public static setToDecimals(): void {
        Injector.storeDispatch('setToDecimals');
    }

    public static removeFromToken(): void {
        Injector.storeCommit('setFromToken', { address: null, value: null });
    }

    public static setFromBlockchain(blockchain: BlockchainName): void {
        Injector.storeCommit('setFromBlockchain', blockchain);
    }

    public static setToBlockchain(blockchain: BlockchainName): void {
        Injector.storeCommit('setToBlockchain', blockchain);
    }
}
