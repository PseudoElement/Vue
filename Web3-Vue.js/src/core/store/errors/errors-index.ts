import { ErrorsState } from './errors-model';
import { ErrorsMutations } from './errors-mutations';

export const ErrorsModule = {
    state: (): ErrorsState => ({
        swapError: null
    }),
    mutations: ErrorsMutations
};
