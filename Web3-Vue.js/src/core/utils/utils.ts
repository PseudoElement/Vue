import { BLOCKCHAIN_IDS } from '../constants/blockchain-ids';
import { BlockchainName } from '../constants/blockchain-names';

export class Utils {
    public static setDebounce(
        callback: () => void,
        debounce: number,
        timerId: ReturnType<typeof setTimeout> | null
    ): ReturnType<typeof setTimeout> | null {
        if (timerId) {
            clearTimeout(timerId);
        }

        return setTimeout(() => {
            callback();
            timerId = null;
        }, debounce);
    }

    public static getChainIdByName(name: BlockchainName): number {
        return BLOCKCHAIN_IDS[name];
    }

    public static getChainNameById(id: number): BlockchainName {
        return Object.entries(BLOCKCHAIN_IDS).find(([name, chainId]) => chainId === id)![0] as BlockchainName;
    }

    public static shortenAmount(amount: string | number | null, decimalsCount: number = 5): string {
        if (amount === null || amount === undefined) return '';
        if (amount === 0) return '0';

        amount = amount.toString();
        const [int, decimals] = amount.split('.');
        const shortDecimals = decimals.slice(0, decimalsCount);

        return `${int}.${shortDecimals}...`;
    }
}
