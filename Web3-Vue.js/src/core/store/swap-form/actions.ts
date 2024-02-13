import { ActionContext } from 'vuex';
import { SwapFormState } from './model';
import { StoreState } from '../models/store-types';
import { Web3Service } from '../../services/web3-service/web3-service';
import { TokenService } from '../../services/token-service';

export const SwapFormActions = {
    async setFromDecimals(ctx: ActionContext<SwapFormState, StoreState>) {
        const from = ctx.state.from;
        const decimals = TokenService.isNative(from.address!) ? 18 : await Web3Service.getDecimals(from.blockchain!, from.address!);
        ctx.state.from.decimals = decimals;
    }
};
