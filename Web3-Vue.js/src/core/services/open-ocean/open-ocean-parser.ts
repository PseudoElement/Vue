import { TokenOption } from '@/src/features/swap/components/swap-form/models/swap-form-types';
import { OpenOceanToken } from './models/open-ocean-api-types';
import { TokenService } from '../token-service';

export class OpenOceanParser {
    public static mapTokens(openOceanTokens: OpenOceanToken[]): TokenOption[] {
        return openOceanTokens
            .filter((t) => t.symbol === 'ETH' || t.symbol === 'BNB' || t.symbol === 'USDC' || t.symbol === 'USDT')
            .map((token) => ({
                text: token.name,
                value: token.symbol,
                address: token.address,
                isDisabled: false
            }))
            .sort((a, b) => {
                if (b.value < a.value) {
                    return -1;
                } else if (b.value > a.value) {
                    return 1;
                }
                return 0;
            })
            .sort((_, b) => {
                if (TokenService.isNative(b.address)) {
                    return 1;
                } else {
                    return -1;
                }
            });
    }
}
