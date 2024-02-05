import { TokenOption } from '../../../features/swap/components/swap-form/models/swap-form-types';
import { SwapFormState } from './model';

export const SwapFormMutations = {
    setFromToken(state: SwapFormState, token: TokenOption): void {
        state.from = { ...state.from, address: token.address, token: token.value };
    },
    setToToken(state: SwapFormState, token: TokenOption): void {
        state.to = { ...state.to, address: token.address, token: token.value };
    }
};
