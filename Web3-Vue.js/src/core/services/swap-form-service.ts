import { Store, useStore } from 'vuex';
import { StoreState } from '../store/models/store-types';
import { TokenOption } from '@/src/features/swap/components/swap-form/models/swap-form-types';
import { BlockchainName } from '../constants/blockchain-names';
import { appCommit, appDispatch } from '../store/store';

export class SwapFormService {
    private _store: Store<StoreState>;

    constructor() {
        this._store = useStore<StoreState>();
    }

    public setFromToken(token: TokenOption): void {
        appCommit('setFromToken', token);
    }

    public setFromDecimals(): void {
        appDispatch('setFromDecimals');
    }

    public setToToken(token: TokenOption): void {
        appCommit('setToToken', token);
    }

    public removeFromToken(): void {
        appCommit('setFromToken', { address: null, value: null });
    }

    public setFromBlockchain(blockchain: BlockchainName): void {
        appCommit('setFromBlockchain', blockchain);
    }

    public setToBlockchain(blockchain: BlockchainName): void {
        appCommit('setToBlockchain', blockchain);
    }
}
