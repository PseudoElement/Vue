import { AppWeb3Actions } from './actions';
import { AppWeb3Getters } from './getters';
import { AppWeb3State } from './model';
import { AppWeb3Mutations } from './mutations';

export const AppWeb3Module = {
    state: (): AppWeb3State => ({
        web3: null
    }),
    mutations: AppWeb3Mutations,
    actions: AppWeb3Actions,
    getters: AppWeb3Getters
};
