import { TokenOption } from '@/src/features/swap/components/swap-form/models/swap-form-types';
import { OpenOceanToken } from './models/open-ocean-api-types';

export class OpenOceanParser {
    public static mapTokens(openOceanTokens: OpenOceanToken[]): TokenOption[] {
        return openOceanTokens.map((token) => ({
            text: token.name,
            value: token.symbol,
            address: token.address,
            isDisabled: false
        }));
    }
}
