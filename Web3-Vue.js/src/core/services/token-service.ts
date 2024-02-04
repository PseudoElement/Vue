export class TokenService {
    public static isNative(address: string): boolean {
        return address.startsWith('0xEeeee') || address.startsWith('0x00000');
    }
}
