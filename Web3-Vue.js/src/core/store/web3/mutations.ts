import Web3 from 'web3';
import { AppWeb3State } from './model';

export const AppWeb3Mutations = {
    connectWeb3(state: AppWeb3State): void {
        if (!window.ethereum) {
            throw new Error('Connect MetaMask wallet!');
        }

        state.web3 = new Web3(window.ethereum);
        state.web3Eth = new Web3(window.ethereum);
    },
    changeWeb3Provider(state: AppWeb3State, rpc: string): void {
        state.web3?.setProvider(rpc);
    }
};

export type AppWeb3MutationsType = keyof typeof AppWeb3Mutations;
