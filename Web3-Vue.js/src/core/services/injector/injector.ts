import { StoreActionsType, StoreMutationsType, StoreState } from '../../store/models/store-types';
import Web3 from 'web3';
import { appCommit, appDispatch, appState } from '../../store/store';

export class Injector {
    public static get storeState(): StoreState {
        return appState();
    }

    //@TODO Handle null wallet address
    public static get walletAddress(): string {
        return this.storeState.wallet.address as string;
    }

    public static get web3(): Web3 {
        return this.storeState.appWeb3.web3 || new Web3();
    }

    public static storeDispatch<T extends StoreActionsType>(action: T, payload?: any): Promise<void> {
        return appDispatch(action, payload);
    }

    public static storeCommit<T extends StoreMutationsType>(mutation: T, payload?: any): void {
        return appCommit(mutation, payload);
    }
}
