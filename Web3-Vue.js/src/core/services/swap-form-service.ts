import { Store, useStore } from 'vuex';
import { StoreState } from '../store/models/store-types';
import { TokenOption } from '@/src/features/swap/components/swap-form/models/swap-form-types';
import { BlockchainName } from '../constants/blockchain-names';

export class SwapFormService {
    private _store: Store<StoreState>;

    constructor() {
        this._store = useStore<StoreState>();
    }

    public setFromToken(token: TokenOption): void {
        this._store.commit('setFromToken', token);
    }

    public setToToken(token: TokenOption): void {
        this._store.commit('setToToken', token);
    }

    public removeFromToken(): void {
        this._store.commit('setFromToken', { address: null, value: null });
    }

    public setFromBlockchain(blockchain: BlockchainName): void {
        this._store.commit('setFromBlockchain', blockchain);
    }

    public setToBlockchain(blockchain: BlockchainName): void {
        this._store.commit('setToBlockchain', blockchain);
    }
}
