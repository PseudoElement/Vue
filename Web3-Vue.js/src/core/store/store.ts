import type { InjectionKey } from 'vue';
import { createStore, type Store as VuexStore } from 'vuex';
import type { StoreState } from './models/store-types';
import { WalletModule } from '../store/wallet/index';
import { AppWeb3Module } from './web3';
import { SwapFormModule } from './swap-form';

export type AppStore = VuexStore<StoreState>;

export const key: InjectionKey<AppStore> = Symbol();

export const store = createStore<StoreState>({
    modules: {
        wallet: WalletModule,
        appWeb3: AppWeb3Module,
        swapForm: SwapFormModule
    }
});
