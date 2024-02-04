import type { WalletState } from '../wallet/model';
import { AppWeb3State } from '../web3/model';

export interface StoreState {
    wallet: WalletState;
    appWeb3: AppWeb3State;
}
