import BigNumber from 'bignumber.js';

export class AmountParser {
    /**
     * Converts amount from Ether to Wei units.
     * @param amount Amount to convert.
     * @param decimals Token decimals.
     * @param roundingMode BigNumberRoundingMode.
     */
    public static toWei(amount: BigNumber | string | number, decimals = 18, roundingMode?: BigNumber.RoundingMode): string {
        return new BigNumber(amount || 0).times(new BigNumber(10).pow(decimals)).toFixed(0, roundingMode);
    }

    /**
     * Converts amount from Wei to Ether units.
     * @param amountInWei Amount to convert.
     * @param decimals Token decimals.
     */
    public static fromWei(amountInWei: BigNumber | string | number, decimals = 18): BigNumber {
        return new BigNumber(amountInWei).div(new BigNumber(10).pow(decimals));
    }
}
