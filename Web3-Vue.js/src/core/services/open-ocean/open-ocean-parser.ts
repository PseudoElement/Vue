import { TokenOption } from '@/src/features/swap/components/swap-form/models/swap-form-types';
import { OpenOceanToken } from './models/open-ocean-api-types';
import { TokenName } from '../../constants/token-names';

export class OpenOceanParser {
    public static mapTokens(openOceanTokens: OpenOceanToken[]): TokenOption[] {
        return openOceanTokens.map((token) => ({
            text: token.name,
            value: token.symbol as TokenName,
            isDisabled: false
        }));
    }
}
