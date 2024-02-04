import Web3, { Web3EthInterface } from 'web3';
import { AppWeb3State } from './model';

export const AppWeb3Getters = {
    web3(state: AppWeb3State): Web3 {
        return state.web3 as Web3;
    },
    web3Eth(state: AppWeb3State): Web3EthInterface {
        return (state.web3 as Web3).eth;
    }
};
