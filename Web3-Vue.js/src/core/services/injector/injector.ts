import { useStore } from 'vuex';
import { StoreActionsType, StoreState } from '../../store/models/store-types';
import Web3 from 'web3';

export class Injector {
    public static get storeState(): StoreState {
        return useStore<StoreState>().state;
    }

    public static get web3(): Web3 {
        return this.storeState.appWeb3.web3 || new Web3();
    }

    private constructor() {}

    public static init(): void {
        new Injector();
    }

    public static storeDispatch<T extends StoreActionsType>(action: T, payload?: any): Promise<any> {
        return useStore<StoreState>().dispatch(action, payload);
    }
}
