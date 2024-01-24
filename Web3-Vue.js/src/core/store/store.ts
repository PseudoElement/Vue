import type { InjectionKey } from 'vue';
import { createStore, type Store, useStore as baseUseStore } from 'vuex';
import type { StoreState } from './models/store-types';
import { walletModule } from '../store/wallet/index';

export const key: InjectionKey<Store<StoreState>> = Symbol();

export const store = createStore<StoreState>({
    modules: {
        wallet: walletModule
    }
});

export function useAppStore() {
    return baseUseStore(key);
}
