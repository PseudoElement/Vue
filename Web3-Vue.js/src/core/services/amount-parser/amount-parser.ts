import BigNumber from 'bignumber.js';

export class AmountParser {
    /**
     * Converts amount from Ether to Wei units.
     * @param amount Amount to convert.
     * @param decimals Token decimals.
     * @param roundingMode BigNumberRoundingMode.
     */
    public static toWei(amount: BigNumber | string | number, decimals = 18, roundingMode?: BigNumber.RoundingMode): string {
        return new BigNumber(amount || 0).multipliedBy(new BigNumber(10).pow(decimals)).toFixed(0, roundingMode);
    }

    /**
     * Converts amount from Wei to Ether units.
     * @param amountInWei Amount to convert.
     * @param decimals Token decimals.
     */
    public static fromWei(amountInWei: BigNumber | string | number | null, decimals = 18): BigNumber {
        if (!amountInWei) return new BigNumber(0);

        return new BigNumber(amountInWei).div(new BigNumber(10).pow(decimals));
    }

    /**
     * Converts number, string or BigNumber value to integer string.
     * @param amount Value to convert.
     * @param multiplier Amount multiplier.
     */
    public static stringifyAmount(amount: number | string | BigNumber | bigint, multiplier = 1): string {
        if (typeof amount === 'bigint') {
            return amount.toString();
        }

        const bnAmount = new BigNumber(amount);
        if (!bnAmount.isInteger()) {
            throw new Error(`Value ${amount} is not integer`);
        }

        return bnAmount.multipliedBy(multiplier).toFixed(0);
    }
}
