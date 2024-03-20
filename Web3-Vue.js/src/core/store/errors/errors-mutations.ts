import { ErrorsState } from './errors-model';

export const ErrorsMutations = {
    setSwapError(state: ErrorsState, message: string) {
        state.swapError = message;
    },
    clearSwapError(state: ErrorsState) {
        state.swapError = null;
    }
};

export type ErrorsMutationsType = keyof typeof ErrorsMutations;
