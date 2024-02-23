import Web3 from 'web3';

export interface AppWeb3State {
    web3: Web3 | null;
    web3Eth: Web3 | null;
}
