import { SwapFormActionsType } from '../swap-form/actions';
import { SwapFormState } from '../swap-form/model';
import { SwapFormMutationsType } from '../swap-form/mutations';
import { WalletActionsType } from '../wallet/actions';
import type { WalletState } from '../wallet/model';
import { WalletMutationsType } from '../wallet/mutations';
import { AppWeb3State } from '../web3/model';
import { AppWeb3MutationsType } from '../web3/mutations';

export interface StoreState {
    wallet: WalletState;
    appWeb3: AppWeb3State;
    swapForm: SwapFormState;
}

export type StoreActionsType = SwapFormActionsType | WalletActionsType;
export type StoreMutationsType = SwapFormMutationsType | WalletMutationsType | AppWeb3MutationsType;
