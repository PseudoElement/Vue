import type { InjectionKey } from 'vue';
import { createStore, type Store as VuexStore } from 'vuex';
import type { StoreActionsType, StoreMutationsType, StoreState } from './models/store-types';
import { WalletModule } from '../store/wallet/index';
import { AppWeb3Module } from './web3';
import { SwapFormModule } from './swap-form';
import { TradeModule } from './trade/trade-index';

export type AppStore = VuexStore<StoreState>;

export const key: InjectionKey<AppStore> = Symbol();

export const store = createStore<StoreState>({
    modules: {
        wallet: WalletModule,
        appWeb3: AppWeb3Module,
        swapForm: SwapFormModule,
        trade: TradeModule
    }
});

export const appDispatch = <T extends StoreActionsType>(action: T, payload?: any) => store.dispatch(action, payload);
export const appCommit = <T extends StoreMutationsType>(mutation: T, payload?: any) => store.commit(mutation, payload);
export const appState = (): StoreState => store.state;
