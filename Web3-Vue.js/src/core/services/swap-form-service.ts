import { Store, useStore } from 'vuex';
import { StoreState } from '../store/models/store-types';
import { TokenOption } from '@/src/features/swap/components/swap-form/models/swap-form-types';

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
}
